import prisma from "../db.js";
import bcrypt from "bcryptjs";
import { http500 } from "../libs/handleErrors.js";
import { sendEmailEmployeeCreated } from "../libs/sendEmail.js";
import fs from "fs";

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.EMPLOYEE.findMany({
      where: {
        State: "ENABLED",
      },
      include: {
        Person: true,
        User: true,
        Salary: true,
        Schedule_Employee: {
          include: {
            Schedule: true,
          },
        },
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    http500(error, req, res);
  }
};

export const createEmployees = async (req, res) => {
  const {
    dni,
    firstName,
    lastName,
    phone,
    email,
    address,
    birthDate,
    gender,
    position,
    salary,
    schedule,
  } = req.body;

  const password = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(password, 10);
  const institutionalEmail = await generateUniqueEmail(firstName, lastName, []);

  try {
    await prisma.$transaction(async (prisma) => {
      const person = await prisma.PERSON.findUnique({
        where: {
          DNI: dni,
        },
      });

      if (person) {
        throw new Error("Este DNI ya está registrado");
      }

      const employee = await prisma.EMPLOYEE.findUnique({
        where: {
          Email: email,
        },
      });

      if (employee) {
        throw new Error("Este correo ya está registrado");
      }

      const newPerson = await prisma.PERSON.create({
        data: {
          DNI: dni,
          First_Name: firstName,
          Last_Name: lastName,
          Birth_Date: birthDate,
          Phone_Number: phone,
          Address: address,
          Gender: gender,
        },
      });

      const userName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;

      const newUser = await prisma.USER.create({
        data: {
          User_Name: userName,
          Email: institutionalEmail,
          Password: hashedPassword,
          Role: "EMPLEADO",
        },
      });

      const newEmployee = await prisma.EMPLOYEE.create({
        data: {
          Email: email,
          Position: position,
          Start_Date: new Date(),
          Person: {
            connect: {
              Id: newPerson.Id,
            },
          },
          User: {
            connect: {
              Id: newUser.Id,
            },
          },
        },
      });

      await prisma.SALARY.create({
        data: {
          Amount: parseFloat(salary),
          State: true,
          Employee: {
            connect: {
              Id: newEmployee.Id,
            },
          },
        },
      });

      await prisma.SCHEDULE_EMPLOYEE.create({
        data: {
          Schedule_Fk: parseInt(schedule),
          Employee_Fk: newEmployee.Id,
        },
      });

      await sendEmailEmployeeCreated({
        firstName: firstName,
        lastName: lastName,
        email: email,
        institutionalEmail: institutionalEmail,
        position: position,
        password: password,
      });

      res.json({
        id: newUser.Id,
        email: newUser.Email,
        userName: newUser.User_Name,
        role: newUser.Role,
      });
    });
  } catch (error) {
    return http500(error, req, res);
  }
};

const calculateVacationDays = (Start_Date, Days_Spent) => {
  const currentDate = new Date();
  const startYear = new Date(Start_Date).getFullYear();
  const currentYear = currentDate.getFullYear();
  const yearsOfWork = currentYear - startYear;
  let totalVacationDays = 0;

  for (let i = 1; i <= yearsOfWork; i++) {
    if (i === 1) {
      totalVacationDays += 10;
    } else if (i < 5) {
      totalVacationDays += 12 + (i - 2) * 2;
    } else {
      totalVacationDays += 20;
    }
  }

  return totalVacationDays - Days_Spent;
};

const generateUniqueEmail = async (
  firstName,
  lastName,
  emails,
  count = 1,
  maxAttempts = 10
) => {
  try {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const firstPart = removeAccents(firstName.trim().split(" ")[0]);
    const secondPart = removeAccents(lastName.trim().split(" ")[0]);

    const firstPartClean = firstPart.replace(/[^a-zA-Z0-9]/g, "");
    const secondPartClean = secondPart.replace(/[^a-zA-Z0-9]/g, "");

    const institutionalEmail = `${firstPartClean}.${secondPartClean}${
      count === 1 ? "" : count
    }@classicvision.com`;

    const emailFound = await prisma.USER.findFirst({
      where: { Email: institutionalEmail.toLowerCase() },
    });

    if (emailFound || emails.includes(institutionalEmail.toLowerCase())) {
      if (count < maxAttempts) {
        return generateUniqueEmail(
          firstName,
          lastName,
          emails,
          count + 1,
          maxAttempts
        );
      } else {
        throw new Error(
          "Se ha alcanzado el límite de intentos para generar un correo electrónico único."
        );
      }
    } else {
      return institutionalEmail.toLowerCase();
    }
  } catch (error) {
    throw error;
  }
};

const generateRandomPassword = () => {
  const length = 15;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.EMPLOYEE.findUnique({
      where: {
        Id: parseInt(id),
      },
      include: {
        Person: true,
        User: true,
        Schedule_Employee: {
          include: {
            Schedule: true,
          },
        },
        Salary: {
          where: {
            State: true,
          },
        },
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployeeByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.EMPLOYEE.findFirst({
      where: {
        User_Fk: parseInt(id),
      },
      include: {
        User: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee by user ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await prisma.EMPLOYEE.findUnique({
      where: {
        Email: req.body.Email,
      },
    });

    const person = await prisma.PERSON.findUnique({
      where: {
        DNI: req.body.Person.DNI,
      },
    });

    if (person && person.Id !== req.body.Person.Id) {
      return res
        .status(400)
        .json([
          "No se actualizaron los campos porque este DNI ya está registrado",
        ]);
    }

    if (employee && employee.Id !== req.body.Id) {
      return res
        .status(400)
        .json([
          "No se actualizaron los campos porque este correo ya está registrado",
        ]);
    }

    const updatedEmployee = await prisma.EMPLOYEE.update({
      where: {
        Id: req.body.Id,
      },
      data: {
        Phone: req.body.Phone,
        Email: req.body.Email,
        Position: req.body.Position,
      },
    });

    const scheduleId = parseInt(req.body.schedule);

    if (
      !isNaN(scheduleId) &&
      req.body.Schedule_Employee &&
      req.body.Schedule_Employee.length > 0 &&
      req.body.Schedule_Employee[0].Id
    ) {
      await prisma.SCHEDULE_EMPLOYEE.update({
        where: {
          Id: req.body.Schedule_Employee[0].Id,
        },
        data: {
          Schedule_Fk: scheduleId,
        },
      });
    }

    await prisma.PERSON.update({
      where: {
        Id: req.body.Person.Id,
      },
      data: {
        DNI: req.body.Person.DNI,
        First_Name: req.body.Person.First_Name,
        Last_Name: req.body.Person.Last_Name,
        Birth_Date: req.body.Person.Birth_Date,
        Phone_Number: req.body.Person.Phone_Number,
        Address: req.body.Person.Address,
        Gender: req.body.Person.Gender,
      },
    });

    const currentSalary = await prisma.SALARY.findUnique({
      where: {
        Id: req.body.Salary[0].Id,
        State: true,
      },
    });

    if (currentSalary.Amount !== req.body.Salary[0].Amount) {
      await prisma.SALARY.update({
        where: {
          Id: req.body.Salary[0].Id,
        },
        data: {
          State: false,
        },
      });

      await prisma.SALARY.create({
        data: {
          Amount: parseFloat(req.body.Salary[0].Amount),
          State: true,

          Employee: {
            connect: {
              Id: req.body.Salary[0].Employee_Fk,
            },
          },
        },
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    return http500(error, req, res);
  }
};

export const disableEmployee = async (req, res) => {
  try {
    const { Id } = req.body;

    const updatedEmployee = await prisma.EMPLOYEE.update({
      where: {
        Id: Id,
      },
      data: {
        State: "DISABLED",
      },
    });

    await prisma.SALARY.updateMany({
      where: {
        Employee_Fk: Id,
      },
      data: {
        State: false,
      },
    });

    await prisma.SCHEDULE_EMPLOYEE.deleteMany({
      where: { Employee_Fk: Id },
    });

    await prisma.VACATION.deleteMany({
      where: { Employee_Fk: Id },
    });

    await prisma.PERMISION.deleteMany({
      where: { Employee_Fk: Id },
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    return http500(error, req, res);
  }
};

export const savePermissionRequest = async (req, res) => {
  try {
    const { Reason, Description, Id, StartDate, EndDate } = req.body;

    let attachedFile = null;

    if (req.file) {
      attachedFile = req.file.filename;
    }

    const user = await prisma.USER.findUnique({
      where: {
        Id: parseInt(Id),
      },
      include: {
        Employee: true,
      },
    });

    if (!user || !user.Employee || !user.Employee[0]) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const employeeId = user.Employee[0].Id;

    const overlappingVacations = await prisma.VACATION.findFirst({
      where: {
        Employee_Fk: parseInt(employeeId),
        Start_Date: { lte: EndDate },
        End_Date: { gte: StartDate },
        State: "APROBADO",
      },
    });

    const overlappingPermissions = await prisma.PERMISION.findFirst({
      where: {
        Employee_Fk: parseInt(employeeId),
        Start_Date: { lte: EndDate },
        End_Date: { gte: StartDate },
        State: "APROBADO",
      },
    });

    if (overlappingVacations || overlappingPermissions) {
      return res.status(400).json({
        error:
          "Ya tiene solicitudes de permisos o vacaciones aprobadas en el rango de fechas proporcionado",
      });
    }

    const permission = await prisma.PERMISION.create({
      data: {
        Employee_Fk: employeeId,
        Reason: Reason,
        Description: Description,
        Attached_File: attachedFile,
        Start_Date: StartDate,
        End_Date: EndDate,
        Read: false,
        ReadEmployee: true,
        State: "PENDIENTE",
      },
    });

    res.status(200).json({
      message: "Solicitud de permiso guardada exitosamente",
      permission,
    });
  } catch (error) {
    console.error("Error al guardar la solicitud de permiso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const saveVacationRequest = async (req, res) => {
  try {
    const { id, StartDate, EndDate } = req.body;

    const employee = await prisma.USER.findUnique({
      where: {
        Id: parseInt(id),
      },
      include: {
        Employee: true,
      },
    });

    if (!employee || !employee.Employee || !employee.Employee[0]) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const { Start_Date, Days_Spent } = employee.Employee[0];
    const availableDays = calculateVacationDays(Start_Date, Days_Spent);

    const requestedDays = calculateDaysWithoutWeekends(StartDate, EndDate);

    if (requestedDays > availableDays) {
      return res.status(400).json({
        error:
          "El rango de fechas solicitado excede los días disponibles de vacaciones",
      });
    }

    const user = await prisma.USER.findUnique({
      where: {
        Id: parseInt(id),
      },
      include: {
        Employee: true,
      },
    });

    if (!user || !user.Employee || !user.Employee[0]) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const employeeId = user.Employee[0].Id;

    const overlappingVacations = await prisma.VACATION.findFirst({
      where: {
        Employee_Fk: parseInt(employeeId),
        Start_Date: { lte: EndDate },
        End_Date: { gte: StartDate },
        State: "APROBADO",
      },
    });

    const overlappingPermissions = await prisma.PERMISION.findFirst({
      where: {
        Employee_Fk: parseInt(employeeId),
        Start_Date: { lte: EndDate },
        End_Date: { gte: StartDate },
        State: "APROBADO",
      },
    });

    if (overlappingVacations || overlappingPermissions) {
      return res.status(400).json({
        error:
          "Ya tiene solicitudes de permisos o vacaciones aprobadas en el rango de fechas proporcionado",
      });
    }

    const vacation = await prisma.VACATION.create({
      data: {
        Employee_Fk: employee.Employee[0].Id,
        Start_Date: StartDate,
        End_Date: EndDate,
        State: "PENDIENTE",
        Read: false,
        ReadEmployee: true,
      },
    });

    res.status(200).json({
      message: "Solicitud de vacaciones guardada exitosamente",
      vacation,
    });
  } catch (error) {
    console.error("Error al guardar la solicitud de vacaciones:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

const calculateDaysWithoutWeekends = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;

  while (start <= end) {
    if (start.getDay() !== 6 && start.getDay() !== 0) {
      count++;
    }
    start.setDate(start.getDate() + 1);
  }

  return count;
};

export const saveSchedule = async (req, res) => {
  try {
    const { scheduleName, ...scheduleData } = req.body;
    const days = [];

    Object.keys(scheduleData).forEach((day) => {
      if (day.includes("Start")) {
        const dayName = day.replace("Start", "");
        const start = scheduleData[`${dayName}Start`];
        const end = scheduleData[`${dayName}End`];
        days.push({ day: dayName, start, end });
      }
    });

    const createdSchedule = await prisma.SCHEDULE.create({
      data: {
        ScheduleName: scheduleName,
        Schedule: {
          set: days.map((day) => ({
            day: day.day,
            start: day.start,
            end: day.end,
          })),
        },
      },
    });

    res.status(200).json(createdSchedule);
  } catch (error) {
    console.error("Error saving schedule:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the schedule" });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduleName, ...scheduleData } = req.body;

    const days = [];

    Object.keys(scheduleData).forEach((day) => {
      if (day.includes("Start")) {
        const dayName = day.replace("Start", "");
        const start = scheduleData[`${dayName}Start`];
        const end = scheduleData[`${dayName}End`];
        days.push({ day: dayName, start, end });
      }
    });

    const updatedSchedule = await prisma.SCHEDULE.update({
      where: { Id: parseInt(id) },
      data: {
        ScheduleName: scheduleName,
        Schedule: {
          set: days.map((day) => ({
            day: day.day,
            start: day.start,
            end: day.end,
          })),
        },
      },
    });

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the schedule" });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await prisma.SCHEDULE.findUnique({
      where: { Id: parseInt(id) },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the schedule by ID" });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const employeesWithSchedule = await prisma.EMPLOYEE.findMany({
      where: {
        Schedule_Employee: {
          some: {
            Schedule_Fk: parseInt(id),
          },
        },
      },
    });

    if (employeesWithSchedule.length > 0) {
      return res.status(400).json({
        error:
          "No se puede borrar el horario porque hay empleados asociados a él",
      });
    }

    const deletedSchedule = await prisma.SCHEDULE.delete({
      where: { Id: parseInt(id) },
    });

    res.status(200).json(deletedSchedule);
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Ocurrió un error al eliminar el horario" });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const allSchedules = await prisma.SCHEDULE.findMany();
    res.status(200).json(allSchedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching schedules" });
  }
};

export const getPermissionAttachedFile = async (req, res) => {
  const { id } = req.params;

  try {
    const permission = await prisma.PERMISION.findUnique({
      where: { Id: parseInt(id) },
      select: { Attached_File: true },
    });

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    if (!permission.Attached_File) {
      return;
    }

    const filePath = `src/assets/requests/${permission.Attached_File}`;

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      return;
    }
  } catch (error) {
    console.error("Error fetching permission attached file:", error);
    res.status(500).json({
      error: "An error occurred while fetching permission attached file",
    });
  }
};

export const getRequestWithReadFalse = async (req, res) => {
  try {
    let permissions;
    let vacations;

    if (req.params.flag === "ADMINISTRADOR") {
      permissions = await prisma.PERMISION.findMany({
        where: {
          Read: false,
        },
      });
      vacations = await prisma.VACATION.findMany({
        where: {
          Read: false,
        },
      });
    } else if (req.params.flag === "EMPLEADO") {
      const user = await prisma.USER.findUnique({
        where: {
          Id: parseInt(req.params.id),
        },
        include: {
          Employee: true,
        },
      });

      if (!user || !user.Employee || !user.Employee[0]) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      const employeeId = user.Employee[0].Id;

      permissions = await prisma.PERMISION.findMany({
        where: {
          ReadEmployee: false,
          Employee_Fk: employeeId,
        },
      });
      vacations = await prisma.VACATION.findMany({
        where: {
          ReadEmployee: false,
          Employee_Fk: employeeId,
        },
      });
    } else {
      return res.status(400).json({ error: "Parámetro flag no válido" });
    }

    const unreadPermissionsCount = permissions.length + vacations.length;

    res.status(200).json({
      unreadPermissionsCount,
    });
  } catch (error) {
    console.error("Error al obtener los permisos:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await prisma.PERMISION.findMany({
      select: {
        Id: true,
        Reason: true,
        Read: true,
        State: true,
        Start_Date: true,
        End_Date: true,
        Created_At: true,
        Employee: {
          select: {
            Person: {
              select: {
                First_Name: true,
                Last_Name: true,
              },
            },
            Position: true,
          },
        },
      },
    });

    res.status(200).json({ permissions });
  } catch (error) {
    console.error("Error al obtener los permisos:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const getAllVacations = async (req, res) => {
  try {
    const vacations = await prisma.VACATION.findMany({
      select: {
        Id: true,
        State: true,
        Read: true,
        ReadEmployee: true,
        Answer: true,
        Start_Date: true,
        End_Date: true,
        Created_At: true,
        Updated_At: true,
        Employee: {
          select: {
            Person: {
              select: {
                First_Name: true,
                Last_Name: true,
              },
            },
            Position: true,
          },
        },
      },
    });

    res.status(200).json({ vacations });
  } catch (error) {
    console.error("Error al obtener las solicitudes de vacaciones:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const getPermissionById = async (req, res) => {
  const { id } = req.params;
  const { flag } = req.params;

  try {
    const permission = await prisma.PERMISION.findUnique({
      where: { Id: parseInt(id) },
      include: {
        Employee: {
          include: {
            Person: true,
          },
        },
      },
    });

    if (flag === "ADMINISTRADOR") {
      const updatedPermission = await prisma.PERMISION.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          Read: true,
        },
      });
    } else if (flag === "EMPLEADO") {
      const updatedPermission = await prisma.PERMISION.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          ReadEmployee: true,
        },
      });
    }

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    res.status(200).json({ permission });
  } catch (error) {
    console.error("Error fetching permission:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching permission" });
  }
};

export const getVacationById = async (req, res) => {
  const { id } = req.params;
  const { flag } = req.params;

  try {
    const vacation = await prisma.VACATION.findUnique({
      where: { Id: parseInt(id) },
      include: {
        Employee: {
          include: {
            Person: true,
          },
        },
      },
    });

    if (flag === "ADMINISTRADOR") {
      const updatedVacation = await prisma.VACATION.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          Read: true,
        },
      });
    } else if (flag === "EMPLEADO") {
      const updatedVacation = await prisma.VACATION.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          ReadEmployee: true,
        },
      });
    }

    if (!vacation) {
      return res.status(404).json({ error: "Vacation not found" });
    }

    res.status(200).json({ vacation });
  } catch (error) {
    console.error("Error fetching vacation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching vacation" });
  }
};

export const updateVacationStateById = async (req, res) => {
  const { id } = req.params;
  const { state, comment, daysBetween, employeeId } = req.body;

  try {
    const updatedVacation = await prisma.VACATION.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        State: state,
        ReadEmployee: false,
        Answer: comment,
      },
    });

    if (!updatedVacation) {
      return res.status(404).json({ error: "Vacation not found" });
    }

    if (state === "APROBADO") {
      const updatedEmployee = await prisma.EMPLOYEE.update({
        where: {
          Id: parseInt(employeeId),
        },
        data: {
          Days_Spent: {
            increment: daysBetween,
          },
        },
      });

      if (!updatedEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
    }

    res.status(200).json({
      message: "Vacation state updated successfully",
      updatedVacation,
    });
  } catch (error) {
    console.error("Error updating vacation state:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating vacation state" });
  }
};

export const updatePermissionStateById = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  const { comment } = req.body;

  try {
    const updatedPermission = await prisma.PERMISION.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        State: state,
        ReadEmployee: false,
        Answer: comment,
      },
    });

    if (!updatedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    res.status(200).json({
      message: "Permission state updated successfully",
      updatedPermission,
    });
  } catch (error) {
    console.error("Error updating permission state:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating permission state" });
  }
};

export const getPermissionsByEmployeeId = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.USER.findUnique({
    where: {
      Id: parseInt(id),
    },
    include: {
      Employee: true,
    },
  });

  if (!user || !user.Employee || !user.Employee[0]) {
    return res.status(404).json({ error: "Empleado no encontrado" });
  }

  const employeeId = user.Employee[0].Id;

  try {
    const permissions = await prisma.PERMISION.findMany({
      where: {
        Employee_Fk: parseInt(employeeId),
      },
      include: {
        Employee: {
          include: {
            Person: true,
          },
        },
      },
    });

    if (!permissions) {
      return res.status(404).json({ error: "Permissions not found" });
    }

    res.status(200).json({ permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching permissions" });
  }
};

export const getVacationsByEmployeeId = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.USER.findUnique({
    where: {
      Id: parseInt(id),
    },
    include: {
      Employee: true,
    },
  });

  if (!user || !user.Employee || !user.Employee[0]) {
    return res.status(404).json({ error: "Empleado no encontrado" });
  }

  const employeeId = user.Employee[0].Id;

  try {
    const vacations = await prisma.VACATION.findMany({
      where: {
        Employee_Fk: parseInt(employeeId),
      },
      include: {
        Employee: {
          include: {
            Person: true,
          },
        },
      },
    });

    if (!vacations) {
      return res.status(404).json({ error: "Vacations not found" });
    }

    res.status(200).json({ vacations });
  } catch (error) {
    console.error("Error fetching vacations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching vacations" });
  }
};

export const getApprovedPermissions = async (req, res) => {
  try {
    const permissions = await prisma.PERMISION.findMany({
      where: {
        State: "APROBADO",
      },
      select: {
        Id: true,
        Reason: true,
        Read: true,
        State: true,
        Start_Date: true,
        End_Date: true,
        Created_At: true,
        Employee: {
          select: {
            Person: {
              select: {
                First_Name: true,
                Last_Name: true,
              },
            },
            Position: true,
          },
        },
      },
    });

    res.status(200).json({ permissions });
  } catch (error) {
    console.error("Error al obtener los permisos aprobados:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const getApprovedVacations = async (req, res) => {
  try {
    const vacations = await prisma.VACATION.findMany({
      where: {
        State: "APROBADO",
      },
      select: {
        Id: true,
        Start_Date: true,
        End_Date: true,
        Employee: {
          select: {
            Person: {
              select: {
                First_Name: true,
                Last_Name: true,
              },
            },
            Position: true,
          },
        },
      },
    });

    res.status(200).json({ vacations });
  } catch (error) {
    console.error("Error al obtener las vacaciones aprobadas:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const getSalaryByEmployeeId = async (req, res) => {
  const { id } = req.params;

  try {
    const salary = await prisma.SALARY.findMany({
      where: {
        Employee_Fk: parseInt(id),
        State: false,
      },
    });

    if (!salary) {
      return res.status(404).json({ error: "Salario no encontrado" });
    }

    res.status(200).json({ salary });
  } catch (error) {
    console.error("Error fetching salary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

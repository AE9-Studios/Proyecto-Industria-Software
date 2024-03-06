import prisma from "../db.js";
import bcrypt from "bcryptjs";
import { http500 } from "../libs/handleErrors.js";
import { sendEmailEmployeeCreated } from "../libs/sendEmail.js";

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
  try {
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

    const employee = await prisma.EMPLOYEE.findUnique({
      where: {
        Email: email,
      },
    });

    const person = await prisma.PERSON.findUnique({
      where: {
        DNI: dni,
      },
    });

    if (person) return res.status(400).json(["Este DNI ya está registrado"]);

    if (employee) {
      return res.status(400).json(["Este correo ya está registrado"]);
    }

    const password = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(password, 10);

    const institutionalEmail = await generateUniqueEmail(
      firstName,
      lastName,
      []
    );

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
  } catch (error) {
    return http500(error, req, res);
  }
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
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const firstPart = removeAccents(firstName.trim().split(' ')[0]);
    const secondPart = removeAccents(lastName.trim().split(' ')[0]);

    const firstPartClean = firstPart.replace(/[^a-zA-Z]/g, '');
    const secondPartClean = secondPart.replace(/[^a-zA-Z]/g, '');

    const institutionalEmail = `${firstPartClean}.${secondPartClean}${
      count === 1 ? '' : count
    }@classicvision.com`;

    const emailFound = await prisma.USER.findUnique({
      where: { Email: institutionalEmail },
    });

    if (emailFound || emails.includes(institutionalEmail)) {
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
          'Se ha alcanzado el límite de intentos para generar un correo electrónico único.'
        );
      }
    } else {
      const normalizedEmail = institutionalEmail.toLowerCase();

      return normalizedEmail;
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
  const { Id } = req.params;

  try {
    const employee = await prisma.EMPLOYEE.findUnique({
      where: {
        Id: parseInt(Id),
      },
      include: {
        Person: true,
        User: true,
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
      return res.status(400).json(["Este DNI ya está registrado"]);
    }

    if (employee && employee.Id !== req.body.Id) {
      return res.status(400).json(["Este correo ya está registrado"]);
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
      console.log("se actualizó salario");
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

    res.status(200).json(updatedEmployee);
  } catch (error) {
    return http500(error, req, res);
  }
};

export const savePermissionRequest = async (req, res) => {
  try {
    const { Reason, Description, Id } = req.body;
    const attachedFile = req.file.filename;

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

    const permission = await prisma.PERMISION.create({
      data: {
        Employee_Fk: employeeId,
        Reason: Reason,
        Discount: false,
        Description: Description,
        Attached_File: attachedFile,
      },
    });

    res
      .status(200)
      .json({
        message: "Solicitud de permiso guardada exitosamente",
        permission,
      });
  } catch (error) {
    console.error("Error al guardar la solicitud de permiso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const saveSchedule = async (req, res) => {
  try {
    console.log(req.body);
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

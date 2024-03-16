import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import {
  getEmployeeById,
  updateEmployee,
  disableEmployee,
  getSalaryByEmployeeId,
  getAllSchedules,
} from "../../api/human-resources.js";

const AdminEmployeeDetails = () => {
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [errors, setErrors] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [previousSalaries, setPreviousSalaries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployee = async (Id) => {
      try {
        const data = await getEmployeeById(Id);
        const response = await getSalaryByEmployeeId(params.id);
        const scheduleName =
          data?.data?.employee?.Schedule_Employee[0]?.Schedule?.ScheduleName ||
          "";

        setEmployee(data);

        setPreviousSalaries(response.data.salary);
        setEditableEmployee({ ...data });
        setScheduleName(scheduleName);
      } catch (error) {
        console.error("Error loading employee:", error);
      }
    };

    if (params.id) {
      loadEmployee(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAllSchedules();
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    if (employee && editableEmployee) {
      const hasChanges =
        JSON.stringify(employee) !== JSON.stringify(editableEmployee);
      setHasChanges(hasChanges);
    }
  }, [employee, editableEmployee]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormErrors({});
    setErrors([]);
    setEditableEmployee(employee);
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

  const validateInputs = (editableEmployee) => {
    const { Person } = editableEmployee.data.employee;
    const salary =
      editableEmployee.data.employee.Salary[0].Amount !== ""
        ? parseFloat(editableEmployee.data.employee.Salary[0].Amount)
        : 0;

    const errors = {
      email: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        editableEmployee.data.employee.Email
      ),
      name: !Person.First_Name.trim(),
      lastname: !Person.Last_Name.trim(),
      address: !Person.Address.trim(),
      phoneNumber: !/^\d{8}$/.test(Person.Phone_Number),
      dni: !/^\d{13}$/.test(Person.DNI),
      salary: isNaN(salary) || salary <= 0,
    };

    setFormErrors(errors);

    return errors;
  };

  const handleSaveEdit = async () => {
    try {
      setShowUpdateModal(false);

      await updateEmployee(editableEmployee.data.employee);
      setIsEditing(false);
      setEmployee(editableEmployee);
      setFormErrors({});
      setErrors([]);

      const response = await getSalaryByEmployeeId(params.id);
      setPreviousSalaries(response.data.salary);
    } catch (error) {
      setIsEditing(false);
      setErrors(error.response.data);
      console.error("Error updating employee:", error);
      setShowUpdateModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "schedule") {
      const selectedScheduleName =
        schedules.find((schedule) => schedule.Id === parseInt(value))
          ?.ScheduleName || "";
      setScheduleName(selectedScheduleName);
    }

    setEditableEmployee((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        employee: {
          ...prevState.data.employee,
          [name]: value,
          Person: {
            ...prevState.data.employee.Person,
            [name]: value,
          },
          Salary: prevState.data.employee.Salary.map((salary) => {
            if (name === "Salary") {
              return { ...salary, Amount: value };
            }
            return salary;
          }),
        },
      },
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await disableEmployee(editableEmployee.data.employee);
      if (response.status === 200) {
        navigate("/admin/human-resources/employees/");
      }
    } catch (error) {
      console.error("Error al deshabilitar al empleado:", error);
    }
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="mx-auto shadow mt-3 mx-auto mb-4 rounded-4 bg-white"
      style={{ maxWidth: "700px" }}
    >
      <div className="px-5 pt-3">
        <a
          href="/admin/human-resources/employees"
          className="py-2 px-5 rounded-3 btn btn-primary text-decoration-none text-white"
        >
          <i className="bi bi-escape"></i>
        </a>
      </div>

      <h2 className="card-title text-center fw-bold mb-4">
        Detalles del Empleado
      </h2>

      <div className="px-5 py-3 container">
        <strong>Usuario:</strong>{" "}
        <span className="badge-detail-gold">
          {employee.data.employee.User.User_Name}
        </span>
      </div>
      <div className="px-5 py-3 container">
        <strong>Correo Institucional:</strong>{" "}
        <span className="badge-detail-gold">
          {employee.data.employee.User.Email}
        </span>
      </div>

      <div className="px-5 py-3 container">
        <strong>Días de vacaciones disponibles:</strong>{" "}
        <span className="badge-detail-gold">
          {calculateVacationDays(
            employee.data.employee.Start_Date,
            employee.data.employee.Days_Spent
          )}
        </span>
      </div>

      <div className="px-5 py-3 container">
        <strong>Fecha de Contratación:</strong>{" "}
        <span className="badge-detail-gold">
          {employee.data.employee.Start_Date}
        </span>
      </div>
      <div className="px-5 py-3 container">
        <hr />
      </div>
      <div className="px-5 pb-3 container">
        <strong>Correo Personal:</strong>{" "}
        {isEditing ? (
          <input
            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
            type="email"
            name="Email"
            value={editableEmployee.data.employee.Email}
            onChange={handleInputChange}
          />
        ) : (
          <span className="badge-detail">{employee.data.employee.Email}</span>
        )}
        {formErrors.email && (
          <span className="form-text text-danger">
            El correo es requerido y debe ser válido
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>DNI:</strong>{" "}
        {isEditing ? (
          <input
            className={`form-control ${formErrors.dni ? "is-invalid" : ""}`}
            type="text"
            name="DNI"
            value={editableEmployee.data.employee.Person.DNI}
            onChange={handleInputChange}
          />
        ) : (
          <span className="badge-detail">
            {employee.data.employee.Person.DNI}
          </span>
        )}
        {formErrors.dni && (
          <span className="form-text text-danger">
            El DNI debe tener 13 dígitos
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Nombres:</strong>{" "}
        {isEditing ? (
          <input
            className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
            type="text"
            name="First_Name"
            value={editableEmployee.data.employee.Person.First_Name}
            onChange={handleInputChange}
          />
        ) : (
          <span className="badge-detail">
            {editableEmployee.data.employee.Person.First_Name}
          </span>
        )}
        {formErrors.name && (
          <span className="form-text text-danger">
            El campo de nombres no puede estar vacío
          </span>
        )}
      </div>
      <div className="px-5 py-3 container">
        <strong>Apellidos:</strong>{" "}
        {isEditing ? (
          <input
            className={`form-control ${
              formErrors.lastname ? "is-invalid" : ""
            }`}
            type="text"
            name="Last_Name"
            value={editableEmployee.data.employee.Person.Last_Name}
            onChange={handleInputChange}
          />
        ) : (
          <span className="badge-detail">
            {editableEmployee.data.employee.Person.Last_Name}
          </span>
        )}
        {formErrors.lastname && (
          <span className="form-text text-danger">
            El campo de apellidos no puede estar vacío
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Fecha de Nacimiento:</strong>{" "}
        {isEditing ? (
          <input
            type="date"
            name="Birth_Date"
            value={editableEmployee.data.employee.Person.Birth_Date.slice(
              0,
              10
            )}
            onChange={handleInputChange}
            className={`form-control ${
              formErrors.birthDate ? "is-invalid" : ""
            }`}
          />
        ) : (
          <span className="badge-detail">
            {new Date(
              employee.data.employee.Person.Birth_Date
            ).toLocaleDateString()}
          </span>
        )}
        {formErrors.birthDate && (
          <span className="form-text text-danger">
            La fecha de nacimiento debe ser menor de 18 años respecto al año
            actual.
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Teléfono Personal:</strong>{" "}
        {isEditing ? (
          <input
            className={`form-control ${
              formErrors.phoneNumber ? "is-invalid" : ""
            }`}
            type="text"
            name="Phone_Number"
            value={editableEmployee.data.employee.Person.Phone_Number}
            onChange={handleInputChange}
            pattern="^\d{8}$"
          />
        ) : (
          <span className="badge-detail">
            {employee.data.employee.Person.Phone_Number}
          </span>
        )}
        {formErrors.phoneNumber && (
          <span className="form-text text-danger">
            El número de teléfono personal debe contener 8 dígitos
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Dirección:</strong>{" "}
        {isEditing ? (
          <textarea
            className={`form-control ${formErrors.address ? "is-invalid" : ""}`}
            name="Address"
            value={editableEmployee.data.employee.Person.Address}
            onChange={handleInputChange}
          />
        ) : (
          <span className="badge-detail">
            {editableEmployee.data.employee.Person.Address}
          </span>
        )}
        {formErrors.address && (
          <span className="form-text text-danger">
            El campo de dirección no puede estar vacío
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Género:</strong>{" "}
        {isEditing ? (
          <select
            className="form-select"
            name="Gender"
            value={editableEmployee.data.employee.Person.Gender}
            onChange={handleInputChange}
          >
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
          </select>
        ) : (
          <span className="badge-detail">
            {employee.data.employee.Person.Gender}
          </span>
        )}
      </div>
      <div className="px-5 py-3 container">
        <strong>Cargo:</strong>{" "}
        {isEditing ? (
          <select
            className="form-select"
            name="Position"
            value={editableEmployee.data.employee.Position}
            onChange={handleInputChange}
          >
            <option value="MEDICO">MEDICO</option>
            <option value="ENFERMERO">ENFERMERO</option>
            <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
            <option value="LIMPIEZA">LIMPIEZA</option>
            <option value="SEGURIDAD">SEGURIDAD</option>
          </select>
        ) : (
          <span className="badge-detail">
            {employee.data.employee.Position}
          </span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Horario:</strong>{" "}
        {isEditing ? (
          <>
            <select
              className={`form-control ${
                formErrors.schedule ? "is-invalid" : ""
              }`}
              name="schedule"
              value={scheduleName}
              onChange={handleInputChange}
            >
              <option value="" hidden defaultValue>
                {scheduleName}
              </option>
              {schedules.map((schedule) => (
                <option key={schedule.Id} value={schedule.Id}>
                  {schedule.ScheduleName}
                </option>
              ))}
            </select>
            {formErrors.schedule && (
              <span className="form-text text-danger">
                Seleccione un horario
              </span>
            )}
          </>
        ) : (
          <span className="badge-detail">{scheduleName}</span>
        )}
      </div>

      <div className="px-5 py-3 container">
        <strong>Salario:</strong>{" "}
        {isEditing ? (
          <>
            <input
              className={`form-control ${
                formErrors.salary ? "is-invalid" : ""
              }`}
              type="number"
              name="Salary"
              value={editableEmployee.data.employee.Salary[0].Amount}
              onChange={handleInputChange}
            />
            {formErrors.salary && (
              <span className="form-text text-danger">
                El salario debe ser mayor que cero
              </span>
            )}
          </>
        ) : (
          <span className="badge-detail">
            {editableEmployee.data.employee.Salary[0].Amount} Lempiras
          </span>
        )}
      </div>

      <div
        className="d-flex justify-content-center"
        style={{ margin: "20px", padding: "20px" }}
      >
        {isEditing ? (
          <>
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                const formErrors = validateInputs(editableEmployee);
                if (!Object.values(formErrors).some((error) => error)) {
                  handleSaveEdit();
                }
              }}
              disabled={!hasChanges}
            >
              Guardar
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary mx-2" onClick={handleEdit}>
              <i className="bi bi-pencil-square"></i> Editar Empleado
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={handleShowDeleteModal}
            >
              <i className="bi bi-person-dash"></i> Eliminar Empleado
            </button>
          </>
        )}
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger m-5" role="alert">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="px-5 py-3 container">
        <hr />
      </div>
      <div className="px-5 py-3 container text-center">
        <h3>Salarios Anteriores</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Salario</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {previousSalaries.map((salary) => (
              <tr key={salary.Id}>
                <td>{salary.Amount}</td>
                <td>{new Date(salary.Created_At).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres dar de baja a este empleado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres actualizar la información del empleado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEmployeeDetails;

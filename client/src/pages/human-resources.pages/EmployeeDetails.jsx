import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  employeeGet,
  employeeUpdate,
  employeeDisabled,
} from "../../api/human-resources.js";

const EmployeeDetails = () => {
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployee = async (Id) => {
      try {
        const data = await employeeGet(Id);
        setEmployee(data);
        setEditableEmployee({ ...data });
      } catch (error) {
        console.error("Error loading employee:", error);
      }
    };

    if (params.id) {
      loadEmployee(params.id);
    }
  }, [params.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormErrors({});
    setErrors([]);
    setEditableEmployee(employee);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidDNI = (value) => {
    const dniPattern = /^\d{13}$/;
    return dniPattern.test(value);
  };

  const isValidName = (value) => {
    return value.trim() !== "";
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidSalary = (salary) => {
    return parseFloat(salary) > 0;
  };

  const handleSaveEdit = async () => {
    if (!isValidEmail(editableEmployee.data.employee.Email)) {
      setFormErrors({ email: true });
      return;
    }
    if (!isValidDNI(editableEmployee.data.employee.Person.DNI)) {
      setFormErrors({ dni: true });
      return;
    }

    if (
      !isValidName(editableEmployee.data.employee.Person.First_Name) ||
      !isValidName(editableEmployee.data.employee.Person.Last_Name) ||
      !isValidName(editableEmployee.data.employee.Person.Address)
    ) {
      setFormErrors({
        name: !isValidName(editableEmployee.data.employee.Person.First_Name),
        lastname: !isValidName(editableEmployee.data.employee.Person.Last_Name),
        address: !isValidName(editableEmployee.data.employee.Person.Address),
      });
      return;
    }

    if (
      !isValidPhoneNumber(editableEmployee.data.employee.Person.Phone_Number)
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "El número de teléfono personal debe contener 8 dígitos",
      }));
      return;
    }

    if (!isValidSalary(editableEmployee.data.employee.Salary[0].Amount)) {
      setFormErrors({ salary: true });
      return;
    }
    try {
      await employeeUpdate(editableEmployee.data.employee);
      setIsEditing(false);
      setEmployee(editableEmployee);
      setFormErrors({});
      setErrors([]);
    } catch (error) {
      setErrors(error.response.data);
      console.error("Error updating employee:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      const response = await employeeDisabled(editableEmployee.data.employee);
      if (response.status === 200) {
        console.log("Empleado deshabilitado correctamente");
        navigate("/admin/human-resources/employees/");
      } else {
        console.log("Hubo un problema al deshabilitar al empleado");
      }
    } catch (error) {
      console.error("Error al deshabilitar al empleado:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="px-4 pt-3">
                <a
                  href="/admin/human-resources/employees"
                  className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
                > 
                  <i className="bi bi-escape"></i>
                </a>
                {'NOTA: optimizar este código, mostrar lista salarios anteriores, mensajes de confirmacion'}
              </div>
              <h2 className="card-title text-center fw-bold mb-4">
                Detalles del Empleado
              </h2>
              <hr />
              <p>
                <strong>ID: </strong>
                <span className="badge-detail-gold">
                  {employee.data.employee.Id}
                </span>
              </p>
              <hr />
              <p>
                <strong>Usuario:</strong>{" "}
                <span className="badge-detail-gold">
                  {employee.data.employee.User.User_Name}
                </span>
              </p>
              <hr />
              <p>
                <strong>Correo Institucional:</strong>{" "}
                <span className="badge-detail-gold">
                  {employee.data.employee.User.Email}
                </span>
              </p>
              <hr />
              <p>
                <strong>Fecha de Creación:</strong>{" "}
                <span className="badge-detail-gold">
                  {employee.data.employee.User.created_At}
                </span>
              </p>
              <hr />
              <p>
                <strong>Estado:</strong>{" "}
                <span className="badge-detail-gold">
                  {editableEmployee.data.employee.State}
                </span>
              </p>
              <hr />
              <p className="form-field">
                <strong>Correo Personal:</strong>{" "}
                {isEditing ? (
                  <input
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    name="Email"
                    value={editableEmployee.data.employee.Email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="badge-detail">
                    {employee.data.employee.Email}
                  </span>
                )}
                {formErrors.email && (
                  <span className="form-text text-danger">
                    El correo es requerido y debe ser válido
                  </span>
                )}
              </p>
              <hr />

              <p className="form-field">
                <strong>DNI:</strong>{" "}
                {isEditing ? (
                  <input
                    className={`form-control ${
                      formErrors.dni ? "is-invalid" : ""
                    }`}
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
              </p>
              <hr />

              <p>
                <strong>Nombres:</strong>{" "}
                {isEditing ? (
                  <input
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
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
              </p>
              <hr />
              <p>
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
              </p>
              <hr />

              <p>
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
                    La fecha de nacimiento debe ser menor de 18 años respecto al
                    año actual.
                  </span>
                )}
              </p>
              <hr />

              <p className="form-field">
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
                  />
                ) : (
                  <span className="badge-detail">
                    {employee.data.employee.Person.Phone_Number}
                  </span>
                )}
                {formErrors.phoneNumber && (
                  <span className="form-text text-danger">
                    {formErrors.phoneNumber}
                  </span>
                )}
              </p>

              <hr />
              <p>
                <strong>Dirección:</strong>{" "}
                {isEditing ? (
                  <textarea
                    className={`form-control ${
                      formErrors.address ? "is-invalid" : ""
                    }`}
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
              </p>
              <hr />

              <p className="form-field">
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
              </p>
              <hr />
              <p className="form-field">
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
              </p>
              <hr />

              <p className="form-field">
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
              </p>

              <hr />

              <div className="d-flex justify-content-center">
                {errors.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center">
                {isEditing ? (
                  <>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={handleSaveEdit}
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
                    <button
                      className="btn btn-primary mx-2"
                      onClick={handleEdit}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleDelete}
                    >
                      Dar de baja
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

import { useForm } from "react-hook-form";
import { employeeCreate, scheduleList } from "../../api/human-resources";
import { useState, useEffect } from "react";

const EmployeeCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: formErrors },
  } = useForm();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [salary, setSalary] = useState(0);
  const [customSalary, setCustomSalary] = useState(true);
  const [errors, setErrors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedSchedule, setSelectedSchedule] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const scheduleData = await scheduleList();
        setSchedules(scheduleData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showSuccessMessage]);

  const handlePositionChange = (e) => {
    const position = e.target.value;
    let newSalary;
    switch (position) {
      case "MEDICO":
        newSalary = 40000;
        break;
      case "ENFERMERO":
        newSalary = 20000;
        break;
      case "ADMINISTRATIVO":
        newSalary = 10000;
        break;
      case "LIMPIEZA":
      case "SEGURIDAD":
        newSalary = 7500;
        break;
      default:
        newSalary = "";
    }
    setSalary(newSalary);
    setCustomSalary(true);
    setValue("salary", newSalary); 
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await employeeCreate(values);
      setSuccessMessage("Empleado creado exitosamente");
      setShowSuccessMessage(true);
      setErrors([]);
      setSalary(0)
      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Error al crear el empleado:", error);
      }
    }
  });
  return (
    <>
      <div className="container-sm mb-3">
        <form
          className="mx-auto shadow mt-3 mx-auto rounded-4 bg-white"
          style={{ maxWidth: "700px" }}
          onSubmit={onSubmit}
        >
          <div className="px-4 pt-3">
            <a
              href="/admin/human-resources"
              className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
            >
              <i className="bi bi-escape"></i>
            </a>
          </div>

          <div className=" pt-3 pb-5">
            <div className="d-flex flex-column align-items-center p-5">
              <h2 className="text-center mb-3">Crear Empleado</h2>
              <div className="container d-flex flex-column"></div>

              <div className="p-2 mb-3 container">
                <label className="form-label">DNI</label>
                <input
                  placeholder="DNI del empleado"
                  className="form-control"
                  type="number"
                  {...register("dni", { required: true, pattern: /^\d{13}$/ })}
                />
                {formErrors.dni && (
                  <span className="form-text text-danger">
                    Ingrese un DNI correctamente, son 13 dígitos sin guiones ni
                    espacios
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">
                  Correo eléctronico personal
                </label>
                <input
                  placeholder="Correo personal del empleado"
                  className="form-control"
                  type="email"
                  {...register("email", { required: true })}
                />
                {formErrors.email && (
                  <span className="form-text text-danger">
                    El correo es requerido
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Nombres</label>
                <input
                  placeholder="Nombres del empleado"
                  className="form-control"
                  type="text"
                  {...register("firstName", { required: true })}
                />
                {formErrors.firstName && (
                  <span className="form-text text-danger">
                    Ingrese los nombres del empleado
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Apellidos</label>
                <input
                  placeholder="Apellidos del empleado"
                  className="form-control"
                  type="text"
                  {...register("lastName", { required: true })}
                />
                {formErrors.lastName && (
                  <span className="form-text text-danger">
                    Ingrese los apellidos del empleado
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Teléfono</label>
                <input
                  placeholder="Número telefónico del empleado"
                  className="form-control"
                  type="tel"
                  {...register("phone", { pattern: /^\d{8}$/, required: true })}
                />
                {formErrors.phone && (
                  <span className="form-text text-danger">
                    8 dígitos, sin guiones ni espacios
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Dirección</label>
                <textarea
                  placeholder="Dirección de residencia del empleado"
                  className="form-control"
                  type="text"
                  {...register("address", { required: true })}
                />
                {formErrors.address && (
                  <span className="form-text text-danger">
                    Ingrese la dirección de residencia del empleado
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  className="form-control"
                  type="date"
                  {...register("birthDate", { required: true })}
                />
                {formErrors.birthDate && (
                  <span className="form-text text-danger">
                    Fecha de nacimiento requerida
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Genero</label>
                <select
                  className="form-control"
                  {...register("gender", { required: true })}
                >
                  <option value="" hidden defaultValue>
                    Seleccione una opción
                  </option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>

                {formErrors.gender && (
                  <span className="form-text text-danger">
                    Seleccione un género
                  </span>
                )}
              </div>

              <div className="p-2 mb-3 container">
                <label className="form-label">Cargo</label>
                <select
                  className="form-control"
                  {...register("position", { required: true })}
                  onChange={handlePositionChange}
                >
                  <option value="" hidden defaultValue>
                    Seleccione un cargo
                  </option>
                  <option value="MEDICO">Médico</option>
                  <option value="ENFERMERO">Enfermero</option>
                  <option value="ADMINISTRATIVO">Administrativo</option>
                  <option value="LIMPIEZA">Limpieza</option>
                  <option value="SEGURIDAD">Seguridad</option>
                </select>
                {formErrors.position && (
                  <span className="form-text text-danger">
                    Seleccione un cargo
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Salario</label>
                <div className="input-group">
                  <input
                    placeholder="Salario"
                    className="form-control"
                    type="number"
                    {...register("salary", {
                      required: true,
                      validate: {
                        positive: (value) => parseFloat(value) > 0,
                      },
                    })}
                    value={salary}
                    onChange={(e) => {
                      setSalary(e.target.value);
                      setCustomSalary(true);
                    }}
                    disabled={!customSalary && salary !== ""}
                  />
                  <span className="input-group-text">L</span>
                </div>
                {formErrors.salary && (
                  <span className="form-text text-danger">
                    {parseFloat(salary) <= 0
                      ? "El salario debe ser mayor que cero"
                      : "Ingrese un salario válido"}
                  </span>
                )}
              </div>

              <div className="p-2 mb-3 container">
                <label className="form-label">Horario</label>
                <select
                  className="form-control"
                  {...register("schedule", { required: true })}
                  onChange={(e) => setSelectedSchedule(e.target.value)}
                >
                  <option value="" hidden defaultValue>
                    Seleccione un horario
                  </option>
                  {schedules.data &&
                    schedules.data.map((schedule) => (
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
              </div>

              <div className="container d-flex flex-column">
                <button
                  className="btn btn-primary mt-3 py-2 px-5 rounded-4 "
                  type="submit"
                >
                  Crear empleado
                </button>

                <br />
                {showSuccessMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

                {errors.map((error, index) => (
                  <div key={index} className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeCreate;

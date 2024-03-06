import { useForm } from "react-hook-form";
import { useState } from "react";
import { employeeCreateSchedule } from "../../api/human-resources";


const EmployeeSchedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = handleSubmit(async (values) => {
    try {
      await employeeCreateSchedule(values);
      setSuccessMessage("Horario creado exitosamente");
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error al crear el horario:", error);
      setErrors(["Error al crear el horario. Inténtelo de nuevo más tarde."]);
    }
  });

  return (
    <div className="container">
                  <a
              href="/admin/human-resources"
              className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
            >
              <i className="bi bi-escape"></i>
            </a> {'NOTA: validar HI < HF, domingo puede ir vacio, limpiar form, crud de horarios, arreglar este form, mensaje exitoso y demás cosas xd'}
      <form onSubmit={onSubmit}>
        <h2>Crear Horario</h2>
        <div className="mb-3">
          <label htmlFor="scheduleName" className="form-label">
            Nombre del Horario
          </label>
          <input
            type="text"
            className="form-control"
            id="scheduleName"
            {...register("scheduleName", { required: true })}
          />
          {formErrors.scheduleName && (
            <span className="form-text text-danger">Nombre requerido</span>
          )}
        </div>

        {/* Horarios para cada día de la semana */}
        <div className="mb-3">
          <label className="form-label">
            Horarios para cada día de la semana
          </label>
          {[
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ].map((day, index) => (
            <div className="row mb-3" key={index}>
              <div className="col">
                <label
                  htmlFor={`${day.toLowerCase()}Start`}
                  className="form-label"
                >
                  {day}
                </label>
                <div className="d-flex">
                  <input
                    type="time"
                    className="form-control me-2"
                    id={`${day.toLowerCase()}Start`}
                    {...register(`${day.toLowerCase()}Start`, {
                      required: true,
                    })}
                  />
                  <span className="input-group-text">-</span>
                  <input
                    type="time"
                    className="form-control ms-2"
                    id={`${day.toLowerCase()}End`}
                    {...register(`${day.toLowerCase()}End`, { required: true })}
                  />
                </div>
                {(formErrors[`${day.toLowerCase()}Start`] ||
                  formErrors[`${day.toLowerCase()}End`]) && (
                  <div className="form-text text-danger">
                    Hora de inicio y final requeridas
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Horario
        </button>

        {showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {Object.values(errors).map((error, index) => (
          <div key={index} className="alert alert-danger" role="alert">
            {error}
          </div>
        ))}
      </form>
    </div>
  );
};

export default EmployeeSchedule;

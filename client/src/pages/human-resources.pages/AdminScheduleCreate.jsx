import { useForm } from "react-hook-form";
import { useState } from "react";
import { saveSchedule } from "../../api/human-resources";

const AdminScheduleCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = handleSubmit(async (values) => {
    const isEndGreaterThanStart = (start, end) => {
      if (!start || !end) return true;
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      return (
        endHour > startHour ||
        (endHour === startHour && endMinute > startMinute)
      );
    };

    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const dayErrors = days.filter(
      (day) =>
        !isEndGreaterThanStart(
          values[`${day.toLowerCase()}Start`],
          values[`${day.toLowerCase()}End`]
        )
    );

    if (dayErrors.length > 0) {
      setErrors(
        dayErrors.map(
          (day) => `${day}: La hora final debe ser mayor que la hora inicial`
        )
      );
      return;
    }

    try {
      await saveSchedule(values);
      setSuccessMessage(`Horario "${values.scheduleName}" creado exitosamente`);
      setShowSuccessMessage(true);
      setErrors([]);
      reset();

      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error al crear el horario:", error);
      setErrors(["Error al crear el horario. Inténtelo de nuevo más tarde."]);
    }
  });

  return (
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
            <h2 className="text-center mb-3">Crear Horario</h2>
            <div className="container d-flex flex-column">
              <div className="p-2 mb-3 container">
                <label htmlFor="scheduleName" className="form-label">
                  <strong>Nombre del Horario:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="scheduleName"
                  {...register("scheduleName", { required: true })}
                  placeholder="Nombre del Horario"
                />
                {formErrors.scheduleName && (
                  <span className="form-text text-danger">
                    Nombre requerido
                  </span>
                )}
              </div>

              <div className="p-2 mb-3 container">
                {[
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                  "Domingo",
                ].map((day, index) => (
                  <div key={index}>
                    <hr />
                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor={`${day.toLowerCase()}Start`}
                          className="form-label fw-bold"
                        >
                          {day}:
                        </label>
                        <div className="d-flex">
                          <input
                            type="time"
                            className="form-control me-2"
                            id={`${day.toLowerCase()}Start`}
                            {...register(`${day.toLowerCase()}Start`, {
                              required: day !== "Domingo",
                            })}
                            placeholder="Hora de inicio"
                          />
                          <span className="input-group-text">-</span>
                          <input
                            type="time"
                            className="form-control ms-2"
                            id={`${day.toLowerCase()}End`}
                            {...register(`${day.toLowerCase()}End`, {
                              required: day !== "Domingo",
                            })}
                            placeholder="Hora de fin"
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
                  </div>
                ))}
              </div>
              <hr />
              <br />
              <div className="container d-flex flex-column">
                <button
                  type="submit"
                  className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                >
                  Crear Horario
                </button>
              </div>
              {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}
              {errors.length > 0 && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminScheduleCreate;

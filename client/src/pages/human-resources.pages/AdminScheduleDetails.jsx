import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getScheduleById, updateSchedule } from "../../api/human-resources";
import { useParams } from "react-router-dom";

const AdminScheduleDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [schedule, setSchedule] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getScheduleById(params.id);
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [params.id]);

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
      await updateSchedule(params.id, values);
      setSuccessMessage(
        `Horario "${values.scheduleName}" actualizado exitosamente`
      );
      setShowSuccessMessage(true);
      setErrors([]);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating schedule:", error);
      setErrors([
        "Error al actualizar el horario. Inténtelo de nuevo más tarde.",
      ]);
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
            href="/admin/human-resources/schedules"
            className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
          >
            <i className="bi bi-escape"></i>
          </a>
        </div>

        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Editar Horario</h2>
            {schedule && (
              <div className="container d-flex flex-column">
                <div className="p-2 mb-3 container">
                  <label htmlFor="scheduleName" className="form-label">
                    <strong>Nombre del Horario:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="scheduleName"
                    defaultValue={schedule.ScheduleName}
                    {...register("scheduleName", { required: true })}
                    placeholder="Nombre del Horario"
                  />
                  {formErrors.scheduleName && (
                    <span className="form-text text-danger">
                      Nombre requerido
                    </span>
                  )}
                </div>

                {schedule.Schedule.set.map((day, index) => (
                  <div key={index} className="p-2 mb-3 container">
                    <hr />
                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor={`${day.day.toLowerCase()}Start`}
                          className="form-label fw-bold"
                        >
                          {day.day.charAt(0).toUpperCase() + day.day.slice(1)}:
                        </label>
                        <div className="d-flex">
                          <input
                            type="time"
                            className="form-control me-2"
                            id={`${day.day.toLowerCase()}Start`}
                            defaultValue={day.start}
                            {...register(`${day.day.toLowerCase()}Start`, {
                              required: day.day != "domingo",
                            })}
                            placeholder="Hora de inicio"
                          />
                          <span className="input-group-text">-</span>
                          <input
                            type="time"
                            className="form-control ms-2"
                            id={`${day.day.toLowerCase()}End`}
                            defaultValue={day.end}
                            {...register(`${day.day.toLowerCase()}End`, {
                              required: day.day != "domingo",
                            })}
                            placeholder="Hora de fin"
                          />
                        </div>
                        {(formErrors[`${day.day.toLowerCase()}Start`] ||
                          formErrors[`${day.day.toLowerCase()}End`]) && (
                          <div className="form-text text-danger">
                            Hora de inicio y final requeridas
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="container d-flex flex-column">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
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
      </form>
    </div>
  );
};

export default AdminScheduleDetails;

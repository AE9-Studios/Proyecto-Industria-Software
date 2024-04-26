import { useState, useEffect } from "react";
import {
  getVacationById,
  updatedVacationById,
} from "../../api/human-resources";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";

const AdminVacationDetails = () => {
  const [vacation, setVacation] = useState(null);
  const [person, setPerson] = useState(null);
  const [newState, setNewState] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [daysBetween, setDaysBetween] = useState(null);
  const [responseSent, setResponseSent] = useState(false);
  const params = useParams();
  const { user } = useAuth();
  const [availableDays, setAvailableDays] = useState(0);

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [
      {
        title: "Volver",
        url: "/admin/human-resources",
        icon: "bi bi-arrow-left-circle-fill",
      },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
    ];
  } else {
    list = [
      { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
      {
        title: "Permisos",
        url: "/employee/permission",
        icon: "bi bi-calendar-check",
      },
      {
        title: "Solicitudes",
        url: "/employee/requests",
        icon: "bi bi-mailbox2",
      },
    ];
  }

  useEffect(() => {
    const loadVacation = async () => {
      try {
        const res = await getVacationById(user.role, params.id);
        setVacation(res.data.vacation);
        setNewState(res.data.vacation.State);

        setAvailableDays(
          calculateVacationDays(
            res.data.vacation.Employee.Start_Date,
            res.data.vacation.Employee.Days_Spent
          )
        );
      } catch (error) {
        console.error("Error al cargar las vacaciones:", error);
        setError("Error al cargar las vacaciones");
      }
    };

    loadVacation();
  }, [params.id, user.role]);

  useEffect(() => {
    if (vacation && vacation.Start_Date) {
      const startDate = new Date(vacation.Start_Date);
      const endDate = new Date(vacation.End_Date);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
      setDaysBetween(diffDays);
    }
  }, [vacation]);

  useEffect(() => {
    if (vacation && vacation.Employee && vacation.Employee.Person) {
      setPerson(vacation.Employee.Person);
    }
  }, [vacation]);

  useEffect(() => {
    if (vacation && vacation.Start_Date) {
      const days = calculateDaysWithoutWeekends(
        vacation.Start_Date,
        vacation.End_Date
      );
      setDaysBetween(days);
    }
  }, [vacation]);

  const handleStateChange = async () => {
    try {
      if (!newState) {
        setError("Debe seleccionar una opción antes de actualizar el estado.");
        return;
      } else {
        setError("");
      }

      if (daysBetween > availableDays) {
        setError(
          "La cantidad de días de vacaciones supera los días disponibles."
        );
        return;
      } else {
        setError("");
      }

      const employeeId = vacation.Employee.Id;

      const response = await updatedVacationById(params.id, {
        state: newState,
        comment,
        daysBetween,
        employeeId,
      });
      setVacation((prevVacation) => ({
        ...prevVacation,
        State: response.data.updatedVacation.State,
      }));

      setResponseSent(true);
      if (newState === "APROBADO") {
        setAvailableDays(availableDays - daysBetween);
      }
      setTimeout(() => {
        setResponseSent(false);
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar el estado de las vacaciones:", error);
      setError("Error al actualizar el estado de las vacaciones");
    }
  };

  const calculateDaysWithoutWeekends = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    while (start <= end) {
      const day = start.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      start.setDate(start.getDate() + 1);
    }

    return count;
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

  return (
    <>
      <div className="container-sm mb-3">
        <div
          className="mx-auto  mt-3 mx-auto rounded-4 bg-white"
          style={{ maxWidth: "700px" }}
        >
          <div className=" pt-3 pb-5">
            <div className="d-flex flex-column align-items-center p-5">
              <h2 className="text-center mb-3">
                Responder Solicitud de Vacaciones
              </h2>
              <div className="container d-flex flex-column">
                {vacation && (
                  <>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>DNI:</strong>
                      </label>
                      <span className="badge-detail">
                        {person && person.DNI}
                      </span>
                    </div>

                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Nombre:</strong>
                      </label>
                      <span className="badge-detail">
                        {person && `${person.First_Name} ${person.Last_Name}`}
                      </span>
                    </div>

                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Cargo:</strong>
                      </label>
                      <span className="badge-detail">
                        {vacation.Employee && vacation.Employee.Position}
                      </span>
                    </div>

                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Estado:</strong>
                      </label>
                      <span className="badge-detail">{vacation.State}</span>
                    </div>

                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Fecha Inicial:</strong>
                      </label>
                      <span className="badge-detail">
                        {vacation.Start_Date}
                      </span>
                    </div>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Fecha Final:</strong>
                      </label>
                      <span className="badge-detail">{vacation.End_Date}</span>
                    </div>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Cantidad de días:</strong>
                      </label>
                      <span className="badge-detail">{daysBetween}</span>
                    </div>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Días de vacaciones disponibles:</strong>
                      </label>
                      <span className="badge-detail">{availableDays}</span>
                    </div>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Seleccione un estado:</strong>
                      </label>
                      <select
                        className="form-select"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                      >
                        <option value="" hidden defaultValue>
                          Seleccione un estado
                        </option>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="APROBADO">Aprobado</option>
                        <option value="RECHAZADO">Rechazado</option>
                      </select>
                    </div>
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Ingrese un comentario:</strong>
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Comentario (Opcional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="container d-flex flex-column">
                      <button
                        className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                        onClick={handleStateChange}
                        disabled={
                          !newState ||
                          newState === vacation.State ||
                          daysBetween > availableDays
                        }
                      >
                        Enviar Respuesta
                      </button>
                      <br />

                      {error && (
                        <span className="form-text text-danger">{error}</span>
                      )}
                      {responseSent && (
                        <div className="alert alert-success" role="alert">
                          Respuesta enviada exitosamente
                        </div>
                      )}
                      {daysBetween > availableDays && (
                        <span className="form-text text-danger">
                          <br /> <br />
                          Ya no puede manipular esta petición, los días
                          solicitados superan los días disponibles.
                          <br /> <br />
                          <strong>Causas:</strong>
                          <li>
                            Acaba de aprobar la solicitud y se han actualizado
                            los dias.
                          </li>
                          <li>
                            Se han aceptado previamente otras solicitudes y se
                            han actualizado los dias.
                          </li>
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation list={list} />
    </>
  );
};

export default AdminVacationDetails;

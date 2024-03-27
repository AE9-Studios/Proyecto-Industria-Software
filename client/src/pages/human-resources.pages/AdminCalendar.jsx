import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getApprovedPermissions,
  getApprovedVacations,
} from "../../api/human-resources";

const AdminCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [permissions, setPermissions] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleDateChange = (date) => {
    setDate(date);
    setIsDateSelected(true);
    updateSelectedEvents(date);
  };

  const updateSelectedEvents = (date) => {
    const eventsForDate = permissions
      .concat(vacations)
      .filter(
        (event) =>
          new Date(event.Start_Date) <= date &&
          date <= new Date(event.End_Date + "T23:59:59.999Z")
      );
    setSelectedEvents(eventsForDate);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const permissionsResponse = await getApprovedPermissions();
        setPermissions(permissionsResponse.data.permissions);

        const vacationsResponse = await getApprovedVacations();
        setVacations(vacationsResponse.data.vacations);

        updateSelectedEvents(date);
      } catch (error) {
        console.error("Error obteniendo los eventos:", error);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const customTileContent = ({ date }) => {
    const hasPermission = permissions.some(
      (permission) =>
        new Date(permission.Start_Date) <= date &&
        date <= new Date(permission.End_Date + "T23:59:59.999Z")
    );
    const hasVacation = vacations.some(
      (vacation) =>
        new Date(vacation.Start_Date) <= date &&
        date <= new Date(vacation.End_Date + "T23:59:59.999Z")
    );
    return (
      <div>
        {hasPermission && <span className="badge bg-info"> </span>}
        {hasVacation && <span className="badge bg-dark"> </span>}
      </div>
    );
  };

  return (
    <div className="container mt-4 bg-white rounded-4 shadow">
      <div className="px-4 pt-3">
        <a
          href="/admin/human-resources"
          className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
        >
          <i className="bi bi-escape"></i>
        </a>
      </div>
      <h2 className="card-title text-center fw-bold mb-4">
        Calendario de Permisos y Vacaciones
      </h2>

      <div className="d-flex justify-content-center">
        <p>
          <span className="badge bg-info text-dark">Permisos</span>{" "}
          <span className="badge bg-dark">Vacaciones</span>
        </p>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={customTileContent}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 className="text-center">Eventos en el día seleccionado:</h3>
        <ul className="list-group">
          {!isDateSelected && (
            <div
              className="alert alert-warning"
              style={{ textAlign: "center" }}
              role="alert"
            >
              Aún no has seleccionado ningún día, selecciona un día para ver los
              eventos.
            </div>
          )}
          {selectedEvents.length === 0 && isDateSelected && (
            <li className="list-group-item" style={{ marginBottom: "20px" }}>
              No hay eventos para este día
            </li>
          )}
          {selectedEvents.map((event) => (
            <li
              key={event.Id}
              className="list-group-item"
              style={{ marginBottom: "20px" }}
            >
              <strong>
                {event.Employee.Person.First_Name}{" "}
                {event.Employee.Person.Last_Name}{" "}
              </strong>
              <br />
              {event.Reason ? (
                <span className="badge bg-info" style={{ color: "black" }}>
                  Permiso desde {event.Start_Date} hasta {event.End_Date}{" "}
                </span>
              ) : (
                <span className="badge bg-dark">
                  Vacaciones desde {event.Start_Date} hasta {event.End_Date}{" "}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCalendar;

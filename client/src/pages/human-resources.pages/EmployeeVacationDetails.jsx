import { useState, useEffect } from "react";
import { getVacationById } from "../../api/human-resources";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";

const EmployeeVacationDetails = () => {
  const list = [
    { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
    {title: "Permisos", url: "/employee/permission", icon: "bi bi-calendar-check"},
    {title: "Solicitudes", url: "/employee/requests", icon: "bi bi-mailbox2"},
  ];
  const [vacation, setVacation] = useState(null);
  const { user } = useAuth();
  const params = useParams();


  useEffect(() => {
    const loadVacation = async () => {
      try {
        const response = await getVacationById(user.role, params.id);
        setVacation(response.data.vacation);
      } catch (error) {
        console.error("Error al cargar los detalles de las vacaciones:", error);
      }
    };

    loadVacation();
  }, [params.id, user.role]);

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

  const daysBetween = vacation
  ? calculateDaysWithoutWeekends(vacation.Start_Date, vacation.End_Date)
  : null;
  
  const getBadgeColor = (state) => {
    switch (state) {
      case "PENDIENTE":
        return "bg-warning text-dark";
      case "APROBADO":
        return "bg-success";
      case "RECHAZADO":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className=" mb-3">
      <div
        className="mx-auto  mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
      >

        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Detalles de las Vacaciones</h2>
            {vacation && (
              <>
                <h4>
                  <span className={`badge ${getBadgeColor(vacation.State)}`}>
                    {vacation.State}
                  </span>
                </h4>
                <div className="container d-flex flex-column">
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      <strong>Fecha de Inicio:</strong>
                    </label>
                    <span className="badge-detail">{vacation.Start_Date}</span>
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
                      <strong>Estado:</strong>
                    </label>
                    <span className="badge-detail">{vacation.State}</span>
                  </div>

                  {vacation.Answer && (
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Respuesta:</strong>
                      </label>
                      <span className="badge-detail-gold">
                        {vacation.Answer}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation list={list} />
    </div>
  );
};

export default EmployeeVacationDetails;

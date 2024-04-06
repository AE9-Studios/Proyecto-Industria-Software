import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import CardTest from "../../components/CardTest";
import { getRequestWithReadFalse } from "../../api/human-resources";

const HHRRHome = () => {
  const { user, logoutUser } = useAuth();
  const [unreadPermissionsCount, setUnreadPermissionsCount] = useState(0);

  useEffect(() => {
    const fetchUnreadPermissionsCount = async () => {
      try {
        const count = await getRequestWithReadFalse(user.role, user.id);
        setUnreadPermissionsCount(count.data.unreadPermissionsCount);
      } catch (error) {
        console.error(
          "Error al obtener el número de permisos no leídos:",
          error
        );
      }
    };

    fetchUnreadPermissionsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user.role === "ADMINISTRADOR" ? (
        <>
          <div className="d-flex flex-column align-items-center">
            <h2>Bienvenido, Administrador</h2>
            <button onClick={logoutUser} className="btn btn-danger py-2">
              Cerrar Sesión
            </button>
          </div>

          <div className="container d-flex justify-content-center">
            <div className="row col justify-content-center">
              <CardTest
                title="Nuevo empleado"
                description="Crea un nuevo empleado"
                icon="bi bi-person-plus"
                url="human-resources/create-employee"
              />
              <CardTest
                title="Ver Empleados"
                description="Mira la lista de todos los empleados"
                icon="bi bi-person-lines-fill"
                url="human-resources/employees"
              />
              <CardTest
                title="Nuevo Horario"
                description="Programa un nuevo horario"
                icon="bi bi-alarm"
                url="human-resources/create-schedule"
              />
              <CardTest
                title="Ver Horarios"
                description="Gestiona los horarios creados"
                icon="bi bi-hourglass-split"
                url="human-resources/schedules"
              />
              <CardTest
                title="Solicitudes"
                description="Administra las peticiones de permisos y vacaciones"
                icon={
                  unreadPermissionsCount > 0
                    ? "bi bi-mailbox2-flag"
                    : "bi bi-mailbox2"
                }
                url="human-resources/permissions"
                requestCount={unreadPermissionsCount}
              />
              <CardTest
                title="Calendario"
                description="Explora el calendario de permisos y vacaciones"
                icon="bi bi-calendar-week"
                url="human-resources/calendar"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center">
            <h2>Bienvenido, Empleado</h2>
            <button onClick={logoutUser} className="btn btn-danger py-2">
              Cerrar Sesión
            </button>
          </div>
          <div className="container d-flex justify-content-center">
            <div className="row col justify-content-center">
              {" "}
              <CardTest
                title="Permisos"
                description="Envia una solicitud de permisos"
                icon="bi bi-calendar-check"
                url="permission"
              />
              <CardTest
                title="Vacaciones"
                description="Envia una solicitud de vacaciones"
                icon="bi bi-sunset"
                url="vacation"
              />
              <CardTest
                title="Solicitudes"
                description="Mira las respuestas a tus solicitudes"
                icon={
                  unreadPermissionsCount > 0
                    ? "bi bi-mailbox2-flag"
                    : "bi bi-mailbox2"
                }
                url="requests"
                requestCount={unreadPermissionsCount}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HHRRHome;

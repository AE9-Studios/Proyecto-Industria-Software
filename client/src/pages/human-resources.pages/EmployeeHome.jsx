import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import CardTest from "../../components/CardTest";
import { getRequestWithReadFalse } from "../../api/human-resources";
import BottomNavigation from "../../components/BottomNavigation";

const HHRRHome = () => {
  let list = [];
  const { user } = useAuth();
  const [unreadPermissionsCount, setUnreadPermissionsCount] = useState(0);

  if (user.role === "ADMINISTRADOR") {
    list = [{ title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" }];
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
          <div className="container p-2 m-auto">
            <h3 className="text-center">Panel de Recursos Humanos</h3>
            <p className="text-center p-2">
              Gestiona el personal y recursos humanos. <br />
              Seleccione una opción para dirigirse al panel correspondiente.
            </p>
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
          <BottomNavigation list={list} />
        </>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center p-2 my-4">
            <h2>Bienvenido, Empleado</h2>
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
              {user.employeeData.Position === "MEDICO" ? (
                <CardTest
                  title="Citas"
                  description="Acepta atiende las citas pendiendes"
                  icon="bi bi-file-earmark-text"
                  url="appointments"
                />
              ) : null}
            </div>
          </div>
          <BottomNavigation list={list} />
        </>
      )}
    </>
  );
};

export default HHRRHome;

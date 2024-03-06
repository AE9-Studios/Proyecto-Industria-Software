import { useAuth } from '../../context/AuthContext';
import CardEmployee from '../../components/CardEmployee';

const EmployeeHome = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="d-flex flex-column align-items-center">
      {user.role === 'ADMINISTRADOR' ? (
        <>
          <h2>Bienvenido, Administrador</h2>
          <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
          <div className="d-flex flex-wrap justify-content-center">
          <CardEmployee
              title="Nuevo empleado"
              description="Ver lista de empleados"
              icon="bi bi-person-plus"
              url="human-resources/create-employee"
            />
            <CardEmployee
              title="Ver empleados"
              description="Ver lista de todos los empleados"
              icon="bi bi-people"
              url="human-resources/employees"
            />
            <CardEmployee
              title="Horarios"
              description="Asignar horarios"
              icon="bi bi-alarm"
              url="human-resources/create-schedule"
            />
            <CardEmployee
              title="Solicitudes"
              description="Ver lista de permisos"
              icon="bi bi-journal-bookmark-fill"
            />
          </div>
        </>
      ) : (
        <>
          <h2>Bienvenido, Empleado</h2>
          <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
            <CardEmployee
              title="Enviar solicitud"
              description="Permisos"
              icon="bi bi-send-plus"
              url="request"
            />          
        </>
      )}
    </div>
  );
};

export default EmployeeHome;

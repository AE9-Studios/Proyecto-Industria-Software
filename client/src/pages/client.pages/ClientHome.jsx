import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CardTest from "../../components/CardTest";
import { getPurchaseOrdersWithReadFalse } from "../../api/sales";

const ClientHome = () => {
  const { user, logoutUser } = useAuth();
  const [unreadOrderCount, setUnreadOrderCount] = useState(0);

  useEffect(() => {
    const fetchUnreadOrderCount = async () => {
      try {
        const count = await getPurchaseOrdersWithReadFalse(user.role, user.id);
        setUnreadOrderCount(count.data.unreadPurchaseOrdersCount);
      } catch (error) {
        console.error(
          "Error al obtener el número de permisos no leídos:",
          error
        );
      }
    };

    fetchUnreadOrderCount();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

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
                title="Nueva venta"
                description="Efectua una nueva venta"
                icon="bi bi-cash-coin"
                url="/admin/sales/new"
              />
              <CardTest
                title="Historial de ventas"
                description="Mira la lista de todas las ventas realizadas"
                icon="bi bi-card-checklist"
                url="/admin/sales/list"
              />
              <CardTest
                title="Orden de ventas"
                description="Gestiona las órdenes de compra pendientes"
                icon={
                  unreadOrderCount > 0
                    ? "bi bi-mailbox2-flag"
                    : "bi bi-mailbox2"
                }
                url="/admin/sales/order-list"
                requestCount={unreadOrderCount}
              />
              <CardTest
                title="Gŕaficos"
                description="Accede a gráficos estadísticos de ventas"
                icon="bi bi-bar-chart-line"
                url="/admin/sales/stadistics"
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>Bienvenido a la página de inicio del cliente.</p>
          <button onClick={logoutUser} className="btn btn-danger py-2">
            Cerrar Sesión
          </button>
        </div>
      )}
    </>
  );
};

export default ClientHome;

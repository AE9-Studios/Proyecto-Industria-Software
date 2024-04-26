import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CardTest from "../../components/CardTest";
import { getPurchaseOrdersWithReadFalse } from "../../api/sales";
import BottomNavigation from "../../components/BottomNavigation";
import CardModules from "../../components/CardModules";

const ClientHome = () => {
  const { user } = useAuth();
  const [unreadOrderCount, setUnreadOrderCount] = useState(0);

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [{ title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" }];
  } else {
    list = [
      { title: "Home", url: "/client/home", icon: "bi bi-house-fill" },
      { title: "Tienda", url: "/client/catalog", icon: "bi bi-shop" },
    ];
  }

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
          <div className="container p-2 m-auto">
            <h3 className="text-center">Panel de Ventas</h3>
            <p className="text-center p-2">
              Gestiona las ventas de tu negocio.
              <br />
              Seleccione una opción para dirigirse al panel correspondiente.
            </p>
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
        <div className="container">
          <h1 className="p-2 mt-4 text-center">
            Bienvenido a la app de Shipsmart
          </h1>
          <p className="p-2 text-center">
            Aquí podrás realizar tus compras de una forma rápida y segura.
            Además, puedes agendar tus citas.
          </p>
          <div className="container d-flex justify-content-center">
            <div className="row p-3 justify-content-center">
              <CardModules
                title="Catálogo"
                icon="bi bi-shop"
                description="Mira los productos disponibles"
                url="/client/catalog"
              />
              <CardModules
                title="Citas"
                icon="bi bi-calendar"
                description="Agenda tus citas"
                url="/client/appointments"
              />
              <CardModules
                title="Mis Compras"
                icon="bi bi-bag-check"
                description="Explora tu historial de compras"
                url="/client/purchases"
              />
              <CardModules
                title="Órdenes de Compra"
                icon="bi bi-card-checklist"
                description="Mira tus órdenes de compra"
                url="/client/orders"
              />
            </div>
          </div>
        </div>
      )}
      <BottomNavigation list={list} />
    </>
  );
};

export default ClientHome;

import BottomNavigation from "../../components/BottomNavigation";
import CardTest from "../../components/CardTest";

const PurchasesPanel = () => {
  const list = [
    { title: "Volver", url: "/admin/home", icon: "bi bi-arrow-left-circle-fill" },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill"}
  ]
  return (
    <div>
      <div className="col">
        <div className="row p-3 justify-content-center">
          <CardTest
            title="Pedidos"
            description="Realiza pedidos de producto a proveedores"
            icon="bi bi-bag-plus"
            url="/admin/purchases/new"
          />
          <CardTest
            title="Cotizaciones"
            description="Solicita cotizaciones de productos a los proveedores"
            icon="bi bi-chat-quote"
            url="/admin/purchases/quotation"
          />
          <CardTest
            title="Gestionar Pedidos"
            description="Gestiona los pedidos y agrega nuevo producto al inventario"
            icon="bi bi-lightning-charge"
            url="/admin/purchases/list"
          />
          <CardTest
            title="Historial de Compras"
            description="Explora el registro detallado de todas las compras realizadas a proveedores"
            icon="bi bi-clipboard2-check"
            url="/admin/purchases/receipts"
          />
        </div>
      </div>
      <BottomNavigation list={list} />
    </div>
  );
};

export default PurchasesPanel;

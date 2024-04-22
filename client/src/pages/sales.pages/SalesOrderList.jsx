import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import {
  getPurchaseOrdersByClientId,
  getAllPurchaseOrders,
  getOrderAttachedFile,
  updateReadClientToFalseById,
  sendOrderReadyEmail,
} from "../../api/sales";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";

const SalesOrderList = () => {
  const { user } = useAuth();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState([]);

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [
      {
        title: "Volver",
        url: "/admin/sales",
        icon: "bi bi-arrow-left-circle-fill",
      },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
    ];
  } else {
    list = [
      { title: "Home", url: "/client/home", icon: "bi bi-house-fill" },
      { title: "Tienda", url: "/client/catalog", icon: "bi bi-shop" },
      { title: "Carrito", url: "/client/checkout", icon: "bi bi-cart-fill" },
    ];
  }

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        let response;

        if (user.role === "ADMINISTRADOR") {
          response = await getAllPurchaseOrders();
        } else {
          response = await getPurchaseOrdersByClientId(user.id);
        }

        const sortedPurchaseOrders = response.data.purchaseOrders.sort(
          (a, b) => {
            if (a.Read !== b.Read) {
              return a.Read ? 1 : -1;
            }
            if (a.State !== b.State) {
              return a.State === "PENDIENTE" ? -1 : 1;
            }
            return new Date(b.Date) - new Date(a.Date);
          }
        );
        setPurchaseOrders(sortedPurchaseOrders);
        setFilteredPurchaseOrders(sortedPurchaseOrders);
      } catch (error) {
        console.log("No tiene ordenes de venta");
      }
    };

    fetchPurchaseOrders();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = purchaseOrders.filter(
      (order) =>
        order.Date.toLowerCase().includes(event.target.value.toLowerCase()) ||
        order.Discount.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        order.Total.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        order.Id.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        (order.Read ? "Leído" : "No leído")
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        order.State.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPurchaseOrders(filtered);
  };

  const downloadOrder = async (orderId, orderDate) => {
    try {
      if (user.role === "ADMINISTRADOR") {
        await updateReadClientToFalseById("ADMINISTRADOR", orderId);
      } else {
        await updateReadClientToFalseById("CLIENT", orderId);
      }
      const response = await getOrderAttachedFile(orderId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const orderName = `orden_${orderId}_${orderDate}.pdf`;
      link.setAttribute("download", orderName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar la orden:", error);
    }
  };

  const handleApproveOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleSaveEdit = async () => {
    setShowUpdateModal(false);
    try {
      await sendOrderReadyEmail(selectedOrderId);
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getBadgeColor = (status) => {
    switch (status) {
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
    <>
      <div className="container mt-4 mb-4 bg-white rounded-4 ">
        <h2 className="card-title text-center fw-bold pt-4 mb-4">
          {user.role === "ADMINISTRADOR"
            ? "Historial de Órdenes de Venta"
            : "Mis Órdenes de Compra"}
        </h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar órdenes..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {user.role === "ADMINISTRADOR" && <th>Número de Orden</th>}
                <th>Estado</th>
                <th>Fecha</th>
                <th>Descuento</th>
                <th>Total</th>
                <th>Detalles de la orden</th>
                {user.role === "ADMINISTRADOR" && <th>Acción</th>}
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((order) => (
                <tr
                  key={order.Id}
                  className={
                    !(
                      (user.role === "ADMINISTRADOR" && order.Read) ||
                      (user.role !== "ADMINISTRADOR" && order.ReadClient)
                    )
                      ? "table-danger"
                      : ""
                  }
                >
                  {user.role === "ADMINISTRADOR" && <td>{order.Id}</td>}
                  <td>
                    <span className={`badge ${getBadgeColor(order.State)}`}>
                      {order.State}
                    </span>
                  </td>
                  <td>{order.Date}</td>
                  <td>{order.Discount > 0 ? `$ ${order.Discount}` : "N/A"}</td>
                  <td>$ {order.Total}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => downloadOrder(order.Id, order.Date)}
                    >
                      <i className="bi bi-box-arrow-down"></i> Descargar Orden
                    </button>
                  </td>
                  {user.role === "ADMINISTRADOR" && (
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApproveOrder(order.Id)}
                      >
                        Aprobar orden de venta
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Anterior
                </button>
              </li>
              {Array.from(
                {
                  length: Math.ceil(
                    filteredPurchaseOrders.length / itemsPerPage
                  ),
                },
                (_, i) => (
                  <li
                    style={{ zIndex: 0 }}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    <button className="page-link">{i + 1}</button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage ===
                  Math.ceil(filteredPurchaseOrders.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* Update Modal */}
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres aprobar esta orden de venta? Se le
            enviará un correo
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <BottomNavigation list={list} style={{ zIndex: 1000 }} />
    </>
  );
};

export default SalesOrderList;

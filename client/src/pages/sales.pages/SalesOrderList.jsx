import { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import {
  getPurchaseOrdersByClientId,
  getAllPurchaseOrders,
  getOrderAttachedFile,
  updateReadClientToFalseById,
  sendOrderReadyEmail,
} from "../../api/sales";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const SalesOrderList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState([]);
  const [sendingData, setSendingData] = useState(false);

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
    setSendingData(true);
    try {
      await sendOrderReadyEmail(selectedOrderId);
      navigate("/admin/sales/");
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } finally {
      setSendingData(false);
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

  const currentDate = new Date().getTime();
  const fileName = `ordenes_ventas_${currentDate}`;

  const handleExportExcel = () => {
    const orderData = filteredPurchaseOrders.map((order) => ({
      Fecha: order.Date,
      Cliente: `${order.Client?.Person?.First_Name || ""} ${
        order.Client?.Person?.Last_Name || ""
      }`,
      "Correo del Cliente": order.Client?.User?.Email || "",
      Estado: order.State,
      Subtotal: order.Subtotal,
      Descuento: order.Discount,
      ISV: order.ISV,
      Total: order.Total,
    }));

    const wscols = calculateColumnWidths(orderData);

    const ws = utils.json_to_sheet(orderData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Órdenes de Ventas");
    ws["!autofilter"] = { ref: ws["!ref"] };
    ws["!cols"] = wscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const tableBody = filteredPurchaseOrders.map((order) => {
      return [
        order.State,
        order.Date,
        `${order.Client?.Person?.First_Name || ""} ${
          order.Client?.Person?.Last_Name || ""
        }`,
        order.Client?.User?.Email || "",
        order.Subtotal,
        order.Discount,
        order.ISV,
        order.Total,
      ];
    });

    doc.autoTable({
      head: [
        [
          "Estado",
          "Fecha",
          "Cliente",
          "Correo del Cliente",
          "Subtotal",
          "Descuento",
          "ISV",
          "Total",
        ],
      ],
      body: tableBody,
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <>
      <div className="container mt-4 mb-4 bg-white rounded-4 ">
        {user.role === "ADMINISTRADOR" ? (
          <>
            <h2 className="card-title text-center fw-bold pt-4 mb-4">
              Historial de Órdenes de Venta
            </h2>{" "}
            <div className="d-flex justify-content-end">
              <button
                className="mb-3 mx-2 btn btn-sm button-pdf"
                onClick={handleExportPDF}
                disabled={purchaseOrders.length === 0}
              >
                Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
              </button>
              <button
                className="mb-3 mx-2 btn btn-sm button-excel"
                onClick={handleExportExcel}
                disabled={purchaseOrders.length === 0}
              >
                Exportar a Excel{" "}
                <i className="bi bi-file-earmark-excel-fill"></i>
              </button>
            </div>
          </>
        ) : (
          <h2 className="card-title text-center fw-bold pt-4 mb-4">
            Mis Órdenes de Compra{" "}
          </h2>
        )}
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
              {purchaseOrders
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((order, index) => (
                  <tr
                    key={index}
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
                    <td>
                      {order.Discount > 0 ? `$ ${order.Discount}` : "N/A"}
                    </td>
                    <td>{order.Total} HNL</td>
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
        <Modal
          show={showUpdateModal}
          onHide={sendingData ? null : handleCloseUpdateModal}
        >
          <Modal.Header closeButton={!sendingData}>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {sendingData ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Enviando...</span>
                </Spinner>
                <p>Notificando al cliente, por favor espere...</p>
              </div>
            ) : (
              <>
                ¿Estás seguro de que quieres aprobar esta orden de venta?
                <br />
                <br />
                <p style={{ color: "red" }}>
                  {" "}
                  Se enviará un correo electrónico al cliente notificando que su
                  orden está lista.
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              disabled={sendingData}
              onClick={handleCloseUpdateModal}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={sendingData}
              onClick={handleSaveEdit}
            >
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

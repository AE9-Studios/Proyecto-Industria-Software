import { useState, useEffect } from "react";
import {
  getApprovedPurchaseOrdersWithDetails,
  getOrderReceipt,
} from "../../api/purchases";
import BottomNavigation from "../../components/BottomNavigation";

const PurchasesReceiptList = () => {
  const list = [
    { title: "Volver", url: "/admin/purchases", icon: "bi bi-arrow-left-circle-fill" },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill" },
  ]
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchApprovedOrders = async () => {
      try {
        const response = await getApprovedPurchaseOrdersWithDetails();
        const sortedOrders = response.data.purchaseOrders.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        );
        setApprovedOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (error) {
        console.error(
          "Error al obtener las órdenes de compra aprobadas:",
          error
        );
      }
    };

    fetchApprovedOrders();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = approvedOrders.filter(
      (order) =>
        order.Date.toLowerCase().includes(event.target.value.toLowerCase()) ||
        order.State.toLowerCase().includes(event.target.value.toLowerCase()) ||
        order.Total.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        order.Id.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const downloadReceipt = async (receiptId) => {
    try {
      const response = await getOrderReceipt(receiptId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const receiptName = `receipt_${receiptId}.pdf`;
      link.setAttribute("download", receiptName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar el recibo:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-4 mb-4 bg-white rounded-4 ">
      <div className="container">
        <h2 className="card-title text-center fw-bold pt-4 mb-4">
          Compras realizadas
        </h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar compras..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Número de Orden</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Descargar Recibo</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.Id}>
                  <td>{order.Id}</td>
                  <td>{order.Supplier.Name}</td>
                  <td>{order.Date}</td>
                  <td>{order.Total} HNL</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => downloadReceipt(order.Id)}
                    >
                      <i className="bi bi-box-arrow-down"></i> Descargar Recibo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Anterior
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(filteredOrders.length / itemsPerPage) },
                (_, i) => (
                  <li
                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                      }`}
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    <button className="page-link">{i + 1}</button>
                  </li>
                )
              )}
              <li
                className={`page-item ${currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
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
      </div>
      <BottomNavigation list={list} />
    </div>
  );
};

export default PurchasesReceiptList;

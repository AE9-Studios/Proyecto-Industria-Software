import { useState, useEffect } from "react";
import { getAllPurchaseOrdersWithDetails } from "../../api/purchases";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation";

const PurchasesOrderList = () => {
  const list = [
    {
      title: "Volver",
      url: "/admin/purchases",
      icon: "bi bi-arrow-left-circle-fill",
    },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill" },
  ];
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await getAllPurchaseOrdersWithDetails();
        const sortedOrders = response.data.purchaseOrders.sort((a, b) => {
          if (a.State === "PENDIENTE" && b.State !== "PENDIENTE") return -1;
          if (a.State !== "PENDIENTE" && b.State === "PENDIENTE") return 1;

          return new Date(b.Date) - new Date(a.Date);
        });
        setPurchaseOrders(sortedOrders);
        setFilteredPurchaseOrders(sortedOrders);
      } catch (error) {
        console.error("Error al listar las órdenes de compra:", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = purchaseOrders.filter(
      (order) =>
        order.Supplier.Name.toLowerCase().includes(
          event.target.value.toLowerCase()
        ) ||
        order.Date.toLowerCase().includes(event.target.value.toLowerCase()) ||
        order.State.toLowerCase().includes(event.target.value.toLowerCase()) ||
        order.Total.toString().includes(event.target.value)
    );
    setFilteredPurchaseOrders(filtered.slice(0, 20));
  };

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4 bg-white rounded-4 ">
      <div className="container">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Órdenes de Compra
        </h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar coincidencias..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchaseOrders.map((order) => (
                <tr
                  key={order.Id}
                  className={order.State !== "PENDIENTE" ? "" : "table-danger"}
                >
                  <td>{order.Supplier.Name}</td>
                  <td>{order.Date}</td>
                  <td>
                    <span className={`badge ${getBadgeColor(order.State)}`}>
                      {order.State}
                    </span>
                  </td>
                  <td>{order.Total} HNL</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(`/admin/purchases/list/${order.Id}`)
                      }
                    >
                      <i className="bi bi-paypal"></i> Procesar Orden
                    </button>
                  </td>
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
      </div>
      <BottomNavigation list={list} style={{ zIndex: 1000 }} />
    </div>
  );
};

export default PurchasesOrderList;

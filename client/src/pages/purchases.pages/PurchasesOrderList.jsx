import { useState, useEffect } from "react";
import { getAllPurchaseOrdersWithDetails } from "../../api/purchases";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
  const itemsPerPage = 20;

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredPurchaseOrders(purchaseOrders.slice(startIndex, endIndex));
  }, [currentPage, purchaseOrders, itemsPerPage]);

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

  const currentDate = new Date().getTime();
  const fileName = `ordenes_compra_${currentDate}`;

  const handleExportExcel = () => {
    const purchaseOrdersData = filteredPurchaseOrders.map((order) => ({
      "ID de Orden": order.Id,
      Fecha: order.Date,
      Proveedor: order.Supplier.Name,
      "Email del Proveedor": order.Supplier.Email,
      "Dirección del Proveedor": order.Supplier.Address,
      "Teléfono del Proveedor": order.Supplier.Phone,
      Producto: order.PURCHASE_ORDER_DETAILED[0]?.Product.Name || "",
      Marca: order.PURCHASE_ORDER_DETAILED[0]?.Product.Brand || "",
      Cantidad: order.PURCHASE_ORDER_DETAILED[0]?.Quantity || "",
      Estado: order.State,
      Total: order.Total,
    }));

    const wscols = calculateColumnWidths(purchaseOrdersData);

    const ws = utils.json_to_sheet(purchaseOrdersData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Órdenes de Compra");
    ws["!autofilter"] = { ref: ws["!ref"] };
    ws["!cols"] = wscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const tableBody = filteredPurchaseOrders.map((order) => [
      order.Id,
      order.Date,
      order.Supplier.Name,
      order.PURCHASE_ORDER_DETAILED[0]?.Product.Name || "",
      order.PURCHASE_ORDER_DETAILED[0]?.Product.Brand || "",
      order.PURCHASE_ORDER_DETAILED[0]?.Quantity || "",
      order.State,
      order.Total,
    ]);

    doc.autoTable({
      head: [
        [
          "ID de Orden",
          "Fecha",
          "Proveedor",
          "Producto",
          "Marca",
          "Cantidad",
          "Estado",
          "Total",
        ],
      ],
      body: tableBody,
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="mt-4 bg-white rounded-4 ">
      <div className="container">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Órdenes de Compra
        </h2>
        <div className="d-flex justify-content-end">
          <button
            className="mb-3 mx-2 btn btn-sm button-pdf"
            onClick={handleExportPDF}
            disabled={filteredPurchaseOrders.length === 0}
          >
            Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button
            className="mb-3 mx-2 btn btn-sm button-excel"
            onClick={handleExportExcel}
            disabled={filteredPurchaseOrders.length === 0}
          >
            Exportar a Excel <i className="bi bi-file-earmark-excel-fill"></i>
          </button>
        </div>
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
              {filteredPurchaseOrders.map((order, index) => (
                <tr
                  key={index}
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
                  length: Math.ceil(purchaseOrders.length / itemsPerPage),
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
                  Math.ceil(purchaseOrders.length / itemsPerPage)
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

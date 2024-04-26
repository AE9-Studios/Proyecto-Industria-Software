import { useState, useEffect } from "react";
import {
  getApprovedPurchaseOrdersWithDetails,
  getOrderReceipt,
} from "../../api/purchases";
import BottomNavigation from "../../components/BottomNavigation";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PurchasesReceiptList = () => {
  const list = [
    {
      title: "Volver",
      url: "/admin/purchases",
      icon: "bi bi-arrow-left-circle-fill",
    },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill" },
  ];
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

  const currentDate = new Date().getTime();
  const fileName = `historial_compras_${currentDate}`;

  const handleExportExcel = () => {
    const purchaseOrderData = filteredOrders.map((order) => ({
      "ID de Orden": order.Id,
      Fecha: order.Date,
      Estado: order.State,
      Total: order.Total,
      Proveedor: order.Supplier.Name,
    }));

    const purchaseOrderWscols = calculateColumnWidths(purchaseOrderData);

    const purchaseOrderWs = utils.json_to_sheet(purchaseOrderData);

    const productDetailsData = [];
    filteredOrders.forEach((order) => {
      order.PURCHASE_ORDER_DETAILED.forEach((detail) => {
        productDetailsData.push({
          "ID de Orden": order.Id,
          Producto: detail.Product.Name,
          Cantidad: detail.Quantity,
          Descripción: detail.Description,
          "Precio Unitario": detail.Product.Price_Sell,
          "Precio Total": detail.Quantity * detail.Product.Price_Sell,
        });
      });
    });

    const productDetailsWscols = calculateColumnWidths(productDetailsData);

    const productDetailsWs = utils.json_to_sheet(productDetailsData);

    const productDetailsMap = {};
    filteredOrders.forEach((order) => {
      order.PURCHASE_ORDER_DETAILED.forEach((detail) => {
        if (!productDetailsMap[order.Id]) {
          productDetailsMap[order.Id] = [];
        }
        productDetailsMap[order.Id].push({
          "ID de Orden": order.Id,
          Producto: detail.Product.Name,
          Cantidad: detail.Quantity,
          Descripción: detail.Description,
          "Precio Unitario": detail.Product.Price_Sell,
          "Precio Total": detail.Quantity * detail.Product.Price_Sell,
        });
      });
    });

    const combinedData = [];
    purchaseOrderData.forEach((order) => {
      const orderId = order["ID de Orden"];
      const productDetails = productDetailsMap[orderId] || [];
      productDetails.forEach((detail) => {
        combinedData.push({ ...order, ...detail });
      });
    });

    const combinedWscols = calculateColumnWidths(combinedData);

    const combinedWs = utils.json_to_sheet(combinedData);

    const wb = utils.book_new();

    utils.book_append_sheet(wb, purchaseOrderWs, "Ordenes de Compra");
    utils.book_append_sheet(wb, productDetailsWs, "Detalles del Producto");
    utils.book_append_sheet(wb, combinedWs, "Ordenes de Compra y Detalles");

    purchaseOrderWs["!autofilter"] = { ref: purchaseOrderWs["!ref"] };
    productDetailsWs["!autofilter"] = { ref: productDetailsWs["!ref"] };
    combinedWs["!autofilter"] = { ref: combinedWs["!ref"] };

    purchaseOrderWs["!cols"] = purchaseOrderWscols;
    productDetailsWs["!cols"] = productDetailsWscols;
    combinedWs["!cols"] = combinedWscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const tableData = filteredOrders.map((order) => [
      order.Id,
      order.Date,
      order.State,
      order.Total,
      order.Supplier.Name,
      order.PURCHASE_ORDER_DETAILED.map(
        (detail) =>
          `Producto: ${detail.Product.Name}, Cantidad: ${detail.Quantity}`
      ).join("\n"),
    ]);

    doc.autoTable({
      head: [
        [
          "ID de Orden",
          "Fecha",
          "Estado",
          "Total",
          "Proveedor",
          "Detalles de Producto",
        ],
      ],
      body: tableData,
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="mt-4 mb-4 bg-white rounded-4 ">
      <div className="container">
        <h2 className="card-title text-center fw-bold pt-4 mb-4">
          Historial de Compras{" "}
        </h2>
        <div className="d-flex justify-content-end">
          <button
            className="mb-3 mx-2 btn btn-sm button-pdf"
            onClick={handleExportPDF}
            disabled={currentOrders.length === 0}
          >
            Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button
            className="mb-3 mx-2 btn btn-sm button-excel"
            onClick={handleExportExcel}
            disabled={currentOrders.length === 0}
          >
            Reporte de Compras en Excel{" "}
            <i className="bi bi-file-earmark-excel-fill"></i>
          </button>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Filtrar compras..."
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.Id}</td>
                  <td>{order.Supplier.Name}</td>
                  <td>{order.Date}</td>
                  <td>{order.Total} HNL</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => downloadReceipt(order.Id)}
                    >
                      <i className="bi bi-cloud-arrow-down-fill"></i> Descargar
                      Recibo
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
                { length: Math.ceil(filteredOrders.length / itemsPerPage) },
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
                  Math.ceil(filteredOrders.length / itemsPerPage)
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

export default PurchasesReceiptList;

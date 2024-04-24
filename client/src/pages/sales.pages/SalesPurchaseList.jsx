import { useState, useEffect } from "react";
import {
  getInvoiceOrdersByClientId,
  getInvoiceAttachedFile,
  getAllInvoiceOrders,
} from "../../api/sales";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const SalesPurchaseList = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
    const fetchInvoices = async () => {
      try {
        let response;

        if (user.role === "ADMINISTRADOR") {
          response = await getAllInvoiceOrders();
        } else {
          response = await getInvoiceOrdersByClientId(user.id);
        }
        const sortedInvoices = response.data.invoiceOrders.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        );
        setInvoices(sortedInvoices);
        setFilteredInvoices(sortedInvoices);
      } catch (error) {
        console.log("no ha realizado compras");
      }
    };

    fetchInvoices();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = invoices.filter(
      (invoice) =>
        invoice.Date.toLowerCase().includes(event.target.value.toLowerCase()) ||
        invoice.Discount.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        invoice.Total.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        invoice.PayMethod.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        invoice.Id.toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  const downloadInvoice = async (invoiceId, invoiceDate) => {
    try {
      const response = await getInvoiceAttachedFile(invoiceId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const invoiceName = `factura_${invoiceId}${invoiceDate}.pdf`;
      link.setAttribute("download", invoiceName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar la factura:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const currentDate = new Date().getTime();
  const fileName = `ventas_${currentDate}`;

  const handleExportExcel = () => {
    const invoiceData = filteredInvoices.map((invoice) => ({
      "ID de Factura": invoice.Id,
      Fecha: invoice.Date,
      Cliente: `${invoice.Client?.Person?.First_Name || ""} ${
        invoice.Client?.Person?.Last_Name || ""
      }`,
      "Correo del Cliente": invoice.Client?.User?.Email || "",
      Empleado: `${invoice.Employee.Person.First_Name} ${invoice.Employee.Person.Last_Name}`,
      "Correo del Empleado": invoice.Employee.Email,
      "Método de Pago": invoice.PayMethod,
      Subtotal: invoice.Subtotal,
      Descuento: invoice.Discount,
      ISV: invoice.ISV,
      Total: invoice.Total,
    }));

    const invoiceWscols = calculateColumnWidths(invoiceData);

    const invoiceWs = utils.json_to_sheet(invoiceData);

    const productDetailsData = [];
    filteredInvoices.forEach((invoice) => {
      invoice.INVOICE_ORDER_PRODUCT_DETAILS.forEach((detail) => {
        productDetailsData.push({
          "ID de Factura": invoice.Id,
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
    filteredInvoices.forEach((invoice) => {
      invoice.INVOICE_ORDER_PRODUCT_DETAILS.forEach((detail) => {
        if (!productDetailsMap[invoice.Id]) {
          productDetailsMap[invoice.Id] = [];
        }
        productDetailsMap[invoice.Id].push({
          "ID de Factura": invoice.Id,
          Producto: detail.Product.Name,
          Cantidad: detail.Quantity,
          Descripción: detail.Description,
          "Precio Unitario": detail.Product.Price_Sell,
          "Precio Total": detail.Quantity * detail.Product.Price_Sell,
        });
      });
    });

    const combinedData = [];
    invoiceData.forEach((invoice) => {
      const productId = invoice["ID de Factura"];
      const productDetails = productDetailsMap[productId] || [];
      productDetails.forEach((detail) => {
        combinedData.push({ ...invoice, ...detail });
      });
    });

    const combinedWscols = calculateColumnWidths(combinedData);

    const combinedWs = utils.json_to_sheet(combinedData);

    const wb = utils.book_new();

    utils.book_append_sheet(wb, invoiceWs, "Facturas");
    utils.book_append_sheet(wb, productDetailsWs, "Detalles del Producto");
    utils.book_append_sheet(wb, combinedWs, "Facturas y Detalles");

    invoiceWs["!autofilter"] = { ref: invoiceWs["!ref"] };
    productDetailsWs["!autofilter"] = { ref: productDetailsWs["!ref"] };
    combinedWs["!autofilter"] = { ref: combinedWs["!ref"] };

    invoiceWs["!cols"] = invoiceWscols;
    productDetailsWs["!cols"] = productDetailsWscols;
    combinedWs["!cols"] = combinedWscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const tableData = filteredInvoices.map((invoice) => [
      invoice.Id,
      invoice.Date,
      `${invoice.Client?.Person?.First_Name || ""} ${
        invoice.Client?.Person?.Last_Name || ""
      }`,
      invoice.Client?.User?.Email || "",
      `${invoice.Employee.Person.First_Name} ${invoice.Employee.Person.Last_Name}`,
      invoice.Employee.Email,
      invoice.PayMethod,
      invoice.Subtotal,
      invoice.Discount,
      invoice.ISV,
      invoice.Total,
      invoice.INVOICE_ORDER_PRODUCT_DETAILS.map(
        (detail) =>
          `Producto: ${detail.Product.Name}, Cantidad: ${detail.Quantity}`
      ).join("\n"),
    ]);

    doc.autoTable({
      head: [
        [
          "ID de Factura",
          "Fecha",
          "Cliente",
          "Correo del Cliente",
          "Empleado",
          "Correo del Empleado",
          "Método de Pago",
          "Subtotal",
          "Descuento",
          "ISV",
          "Total",
          "Detalles de Producto",
        ],
      ],
      body: tableData,
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <>
      <div className="container mt-4 mb-4 bg-white rounded-4 ">
        {user.role === "ADMINISTRADOR" ? (
          <>
            <h2 className="card-title text-center fw-bold pt-4 mb-4">
              Historial de Ventas
            </h2>{" "}
            <div className="d-flex justify-content-end">
              <button
                className="mb-3 mx-2 btn btn-sm button-pdf"
                onClick={handleExportPDF}
                disabled={currentInvoices.length === 0}
              >
                Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
              </button>
              <button
                className="mb-3 mx-2 btn btn-sm button-excel"
                onClick={handleExportExcel}
                disabled={currentInvoices.length === 0}
              >
                Reporte de Ventas en Excel{" "}
                <i className="bi bi-file-earmark-excel-fill"></i>
              </button>
            </div>
          </>
        ) : (
          <h2 className="card-title text-center fw-bold pt-4 mb-4">
            Mis Compras
          </h2>
        )}

        <div className="mb-3">
          <input
            type="text"
            placeholder="Filtrar facturas..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {user.role === "ADMINISTRADOR" ? (
                  <>
                    <th>Número de Factura</th>
                    <th>Método de pago</th>
                  </>
                ) : null}

                <th>Fecha</th>
                <th>Descuento</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr key={invoice.Id}>
                  {user.role === "ADMINISTRADOR" ? (
                    <>
                      <td>{invoice.Id}</td>
                      <td>
                        {invoice.PayMethod === "LINEA" ? (
                          <span className="badge bg-dark">LINEA</span>
                        ) : (
                          <span className="badge bg-primary">CAJA</span>
                        )}
                      </td>
                    </>
                  ) : null}

                  <td>{invoice.Date}</td>
                  <td>
                    {invoice.Discount > 0 ? `${invoice.Discount} HNL` : "N/A"}
                  </td>
                  <td>{invoice.Total} HNL</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => downloadInvoice(invoice.Id, invoice.Date)}
                    >
                      <i className="bi bi-cloud-arrow-down-fill"></i> Descargar
                      Factura
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example" style={{ zIndex: -1 }}>
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
                { length: Math.ceil(filteredInvoices.length / itemsPerPage) },
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
                  Math.ceil(filteredInvoices.length / itemsPerPage)
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
    </>
  );
};

export default SalesPurchaseList;

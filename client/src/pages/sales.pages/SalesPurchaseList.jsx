import { useState, useEffect } from "react";
import {
  getInvoiceOrdersByClientId,
  getInvoiceAttachedFile,
  getAllInvoiceOrders,
} from "../../api/sales";
import { useAuth } from "../../context/AuthContext";

const SalesPurchaseList = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
        console.error("Error al obtener las facturas:", error);
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

  return (
    <div className="container mt-4 mb-4 bg-white rounded-4 shadow">
      {user.role === "ADMINISTRADOR" ? (
        <>
          <a
            href="/admin/sales"
            className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
          >
            <i className="bi bi-escape"></i>
          </a>
          <h2 className="card-title text-center fw-bold pt-4 mb-4">
            Historial de Ventas
          </h2>{" "}
        </>
      ) : (
        <h2 className="card-title text-center fw-bold pt-4 mb-4">
          Mis Compras
        </h2>
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar facturas..."
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
              <th>Detalles de la compra</th>
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
                  {invoice.Discount > 0 ? `$ ${invoice.Discount}` : "N/A"}
                </td>
                <td>$ {invoice.Total}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => downloadInvoice(invoice.Id, invoice.Date)}
                  >
                    <i className="bi bi-box-arrow-down"></i> Descargar Factura
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
              { length: Math.ceil(filteredInvoices.length / itemsPerPage) },
              (_, i) => (
                <li
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
  );
};

export default SalesPurchaseList;

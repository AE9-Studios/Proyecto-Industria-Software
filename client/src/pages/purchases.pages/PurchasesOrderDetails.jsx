import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPurchaseOrderByIdWithDetails,
  updatePurchaseOrderAndInventory,
  rejectPurchaseOrder,
} from "../../api/purchases";
import { Modal, Button, Spinner } from "react-bootstrap";

const PurchasesOrderDetails = () => {
  const navigate = useNavigate();
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const params = useParams();
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);
  const [valuation, setValuation] = useState(24.71);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const attachedFileRef = useRef();
  const valuationRef = useRef();

  useEffect(() => {
    attachedFileRef.current = attachedFile;
  }, [attachedFile]);

  useEffect(() => {
    valuationRef.current = valuation;
  }, [valuation]);

  const getExchangeRate = async (baseCurrency, targetCurrency) => {
    const apiKey = "7a3bd3465dbf4fe6900b57f6526dcf33";
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const exchangeRate = data.rates[targetCurrency];
      return exchangeRate;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  };

  useEffect(() => {
    if (attachedFile) {
      console.log("Archivo adjunto seleccionado:", attachedFile);
    }
  }, [attachedFile]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AfJf7W5zbLHZBf2JAZmXlpeMBLxJgTN7hlt9b0knawQxJ3uwmM8vP4MQ4kvM80IozRi3U6ETY9l1TznN";
    script.addEventListener("load", () => setPaypalLoaded(true));
    document.body.appendChild(script);

    return () => {
      if (script && script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rate = await getExchangeRate("USD", "HNL");

        setValuation(rate);
      } catch (error) {
        console.error(
          "Error fetching invoice ID or checking senior citizen status:",
          error
        );
      }
    };

    fetchData();
  }, [valuation]);

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await getPurchaseOrderByIdWithDetails(params.id);
        setPurchaseOrder(response.data.purchaseOrder);
      } catch (error) {
        console.error(
          "Error al cargar los detalles de la orden de compra:",
          error
        );
      }
    };

    fetchPurchaseOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (paypalLoaded && purchaseOrder) {
      const totalUSD = parseFloat(
        purchaseOrder.Total / valuationRef.current
      ).toFixed(2);
      console.log(totalUSD)
      const paypalButtonContainer = document.getElementById(
        "paypal-button-container"
      );

      const renderPaypalButton = () => {
        paypalButtonContainer.innerHTML = "";

        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: totalUSD,
                    },
                  },
                ],
                application_context: {
                  brand_name: "carrito de Classic Vision",
                },
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function () {
                const formData = new FormData();
                formData.append("id", purchaseOrder.Id);
                formData.append("receipt", attachedFileRef.current);
                updatePurchaseOrderAndInventory(formData)
                  .then(() => {})
                  .catch((error) => {
                    console.error("Error updating purchase order:", error);
                  });
                navigate("/admin/purchases");
              });
            },
          })
          .render("#paypal-button-container");
      };

      renderPaypalButton();
    }
  }, [paypalLoaded, purchaseOrder]);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttachedFile(file);
    setFileAttached(true);
  };

  const handleConfirmCancelOrder = async () => {
    try {
      setLoading(true);
      await rejectPurchaseOrder({ id: purchaseOrder.Id });
      setShowModal(false);

      navigate("/admin/purchases/list");
    } catch (error) {
      console.error("Error al cancelar la orden:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelOrder = () => {
    setShowModal(true);
  };

  return (
    <div className="container mt-3">
      {purchaseOrder && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Detalles de la Orden de Compra</h5>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm-6">
                <strong>Proveedor:</strong> {purchaseOrder.Supplier.Name}
              </div>
              <div className="col-sm-6 text-sm-end">
                <strong>Estado:</strong>{" "}
                <span className={`badge ${getBadgeColor(purchaseOrder.State)}`}>
                  {purchaseOrder.State}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <strong>Fecha:</strong>{" "}
                {new Date(purchaseOrder.Date).toLocaleDateString()}
              </div>
              <div className="col-sm-6 text-sm-end">
                <strong>Total:</strong> {purchaseOrder.Total} HNL
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {" "}
              <button
                className="btn btn-danger "
                style={{
                  display:
                    purchaseOrder.State !== "PENDIENTE" ? "none" : "flex",
                }}
                onClick={handleCancelOrder}
              >
                <i className="bi bi-journal-x"></i>
                {"\u00A0"}Cancelar orden
              </button>
            </div>
            <br />
            <hr />
            <br />
            <h6 className="card-subtitle mb-2">Detalles:</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.PURCHASE_ORDER_DETAILED.map(
                    (detail, index) => (
                      <tr key={index}>
                        <td>{detail.Product.Name}</td>
                        <td>{detail.Quantity}</td>
                        <td>{detail.Product.Price_Buy} HNL</td>
                        <td>
                          {detail.Quantity * detail.Product.Price_Buy} HNL
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <br />
            <hr />
            <br />
            <div
              className="row"
              style={{
                display: purchaseOrder.State !== "PENDIENTE" ? "none" : "flex",
              }}
            >
              <div className="col">
                <div className="p-2 mb-3 container">
                  <small>
                    <span style={{ color: "red" }}>
                      <i className="bi bi-info-circle-fill"></i> Debe adjuntar
                      un recibo o factura entregada por los proveedores para
                      justificar el pago.
                    </span>
                  </small>
                  <br />
                  <small>
                    <span style={{ color: "red" }}>
                      <i className="bi bi-info-circle-fill"></i> El inventario
                      será inmediatamente actualizado después de realizar el
                      pago a proveedores.
                    </span>
                  </small>
                  <br />
                  <br />

                  <input
                    className="form-control"
                    type="file"
                    name="receipt"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-center"
              style={{
                display: purchaseOrder.State !== "PENDIENTE" ? "none" : "flex",
              }}
            >
              {fileAttached ? (
                <div
                  className="col-6 text-center"
                  id="paypal-button-container"
                ></div>
              ) : (
                <div
                  className="col-6 text-center"
                  id="paypal-button-container"
                  style={{ pointerEvents: "none" }}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para confirmar cancelación de orden */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Enviando...</span>
              </Spinner>
              <p>
                Enviando mensaje de rechazo al proveedor, por favor espere...
              </p>
            </div>
          ) : (
            <>
              <p>¿Estás seguro de que deseas cancelar esta orden?</p>
              <p style={{ color: "red" }}>
                Se enviará un correo electrónico al proveedor con la
                notificación de cancelación.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={loading}
          >
            Cerrar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmCancelOrder}
            disabled={loading}
          >
            Cancelar orden
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PurchasesOrderDetails;

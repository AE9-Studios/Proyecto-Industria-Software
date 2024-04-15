import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../context/ShoppingCartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getNextInvoiceIdAndCheckSeniority } from "../../api/sales.js";
import sendInvoice from "../../libs/sendInvoice.js";
import downloadQuotation from "../../libs/downloadQuotation.js";

const SalesPurchaseCheckout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { purchaseList, increaseQuantity, decreaseQuantity, deletePurchase } =
    useContext(CartContext);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [valuation, setValuation] = useState(24.63);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const totalRef = useRef(0);
  const purchaseListRef = useRef(purchaseList);

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
    const fetchData = async () => {
      try {
        const rate = await getExchangeRate("USD", "HNL");
        const { data } = await getNextInvoiceIdAndCheckSeniority(user.id);
        const nextInvoiceId = data.nextInvoiceId;
        const isSenior = data.isSenior;
  
        // Determinar el descuento aplicado según el rol del usuario
        const discountApplied = user.role === "ADMINISTRADOR" ? false : isSenior;
  
        // Actualizar el estado de invoiceNumber
        setInvoiceNumber(nextInvoiceId);
        // Actualizar el estado de discountApplied
        setDiscountApplied(discountApplied);
        // Actualizar el estado de valuation
        setValuation(rate);
      } catch (error) {
        console.error(
          "Error fetching invoice ID or checking senior citizen status:",
          error
        );
      }
    };
  
    fetchData();
  }, [user.id]); // Ejecutar el efecto cuando user.id cambie
  
  // Agregar efectos adicionales para verificar los cambios en cada estado individual
  useEffect(() => {
    console.log("Invoice number updated:", invoiceNumber);
  }, [invoiceNumber]);
  
  useEffect(() => {
    console.log("Discount applied updated:", discountApplied);
  }, [discountApplied]);
  
  useEffect(() => {
    console.log("Valuation updated:", valuation);
  }, [valuation]);
  
  
  
  const handleVendAndPrintInvoice = async () => {
    try {
      if (user.role === "ADMINISTRADOR") {
        await sendInvoice({
          purchaseList: purchaseListRef.current,
          subtotal: (parseFloat(totalRef.current) / 1.15).toFixed(2),
          total: (
            parseFloat(totalRef.current) -
            (discountApplied ? parseFloat(totalRef.current) * 0.1 : 0)
          ).toFixed(2),
          userId: null,
          userName: user.role === "ADMINISTRADOR" ? clientName : user.userName,
          email: user.role === "ADMINISTRADOR" ? clientEmail : user.email,
          discount: discountApplied
            ? `${(parseFloat(totalRef.current) * 0.1).toFixed(
                2
              )} (10% Tercera Edad)`
            : "0.00",
          invoiceNumber: invoiceNumber,
          payMethod: "CAJA",
          typeIO: "INVOICE",
        });

        navigate("/admin/sales/list");
      } else {
        setShowUpdateModal(false);

        await sendInvoice({
          purchaseList: purchaseListRef.current,
          subtotal: (parseFloat(totalRef.current) / 1.15).toFixed(2),
          total: (
            parseFloat(totalRef.current) -
            (discountApplied ? parseFloat(totalRef.current) * 0.1 : 0)
          ).toFixed(2),
          userId: user.id,
          userName: user.role === "ADMINISTRADOR" ? clientName : user.userName,
          email: user.role === "ADMINISTRADOR" ? clientEmail : user.email,
          discount: discountApplied
            ? `${(parseFloat(totalRef.current) * 0.1).toFixed(
                2
              )} (10% Tercera Edad)`
            : "0.00",
          invoiceNumber: invoiceNumber,
          payMethod: "CAJA",
          typeIO: "ORDER",
        });

        purchaseListRef.current.forEach((item) => {
          deletePurchase(item.Id);
        });
        navigate("/client/thankyouorder");
      }
    } catch (error) {
      console.error("Error al enviar la factura:", error);
    }
  };

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
    purchaseListRef.current = purchaseList;
  }, [purchaseList]);

  useEffect(() => {
    if (paypalLoaded) {
      const renderPaypalButton = () => {
        const paypalButtonContainer = document.getElementById(
          "paypal-button-container"
        );
        if (paypalButtonContainer) {
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
                        value: (
                          parseFloat(totalRef.current / valuation) -
                          (discountApplied
                            ? parseFloat(totalRef.current / valuation) * 0.1
                            : 0)
                        ).toFixed(2),
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
                  sendInvoice({
                    purchaseList: purchaseListRef.current,
                    subtotal: (parseFloat(totalRef.current) / 1.15).toFixed(2),
                    total: (
                      parseFloat(totalRef.current) -
                      (discountApplied ? parseFloat(totalRef.current) * 0.1 : 0)
                    ).toFixed(2),
                    userName: user.userName,
                    userId: user.id,
                    email: user.email,
                    discount: discountApplied
                      ? `${(parseFloat(totalRef.current) * 0.1).toFixed(
                          2
                        )} (10% Tercera Edad)`
                      : "0.00",
                    invoiceNumber: invoiceNumber,
                    payMethod: "LINEA",
                    typeIO: "INVOICE",
                  });

                  purchaseListRef.current.forEach((item) => {
                    deletePurchase(item.Id);
                  });
                  navigate("/client/thankyou");
                });
              },
            })
            .render("#paypal-button-container");
        }
      };

      renderPaypalButton();
    }
  }, [paypalLoaded]);

  useEffect(() => {
    const newTotal = parseFloat(calculateTotal());
    totalRef.current = newTotal;
  }, [purchaseList]);

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const calculateTotal = () => {
    return purchaseList
      .reduce((total, item) => total + item.Price_Buy * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mt-4 mb-4 bg-white rounded-4 shadow">
      <h2 className="card-title text-center fw-bold p-4">
        {user.role === "ADMINISTRADOR" ? "Nueva Venta" : "Carrito de Compras"}
      </h2>

      <button
        className="btn btn-warning m-2"
        disabled={!(calculateTotal() > 0)}
        onClick={() =>
          downloadQuotation({
            productList: purchaseList,
            discount: discountApplied
              ? (parseFloat(totalRef.current) * 0.1).toFixed(2)
              : 0.0,
            subtotal: (parseFloat(totalRef.current) / 1.15).toFixed(2),
            total: (
              totalRef.current - (discountApplied ? calculateTotal() * 0.1 : 0)
            ).toFixed(2),
            userName:
              user.role === "ADMINISTRADOR" ? clientName : user.userName,
            email: user.role === "ADMINISTRADOR" ? clientEmail : user.email,
          })
        }
      >
        <i className="bi bi-filetype-pdf"></i> Descargar Cotización
      </button>

      {user.role !== "ADMINISTRADOR" && (
        <button
          className="btn btn-success m-2"
          disabled={!(calculateTotal() > 0)}
          onClick={handleOpenUpdateModal}
        >
          <i className="bi bi-send-check-fill"></i> Enviar Orden de Venta
        </button>
      )}
      <br />
      <br />
      {user.role === "ADMINISTRADOR" && (
        <div className="container">
          {/* Campos para el nombre y email del cliente */}
          <div className="mb-3">
            <label htmlFor="clientName" className="form-label">
              Nombre del Cliente (obligatorio)
            </label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientEmail" className="form-label">
              Email del Cliente (opcional)
            </label>
            <input
              type="email"
              className="form-control"
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
          {/* Casilla de verificación para el descuento de tercera edad */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="discountCheckbox"
              checked={discountApplied}
              onChange={(e) => setDiscountApplied(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="discountCheckbox">
              Aplicar descuento de tercera edad
            </label>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
            <tr>
              <th>Item</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {purchaseList.map((item) => (
              <tr key={item.Id}>
                <td>{item.Name}</td>
                <td>{item.Price_Buy.toFixed(2)} HNL</td>
                <td className="quantity-cell">
                  <div className="d-flex align-items-center quantity-buttons">
                    <button
                      className="btn btn-outline-primary me-1"
                      onClick={() => decreaseQuantity(item.Id)}
                    >
                      -
                    </button>
                    <button className="btn btn-primary me-1">
                      {item.quantity}
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => increaseQuantity(item.Id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deletePurchase(item.Id)}
                  >
                    <i className="bi bi-cart-x-fill"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}

            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
            <tr>
              <td colSpan={4}>
                <b>Detalles de la compra</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>ISV:</b>
              </td>
              <td>15%</td>
            </tr>
            <tr>
              <td>
                <b>Descuento:</b>
              </td>

              <td>
                {discountApplied ? (
                  <>{(calculateTotal() * 0.1).toFixed(2)} HNL</>
                ) : (
                  "0.00 HNL"
                )}
              </td>
            </tr>
            {discountApplied ? (
              <tr>
                <td colSpan={4}>
                  <span className="badge bg-info text-dark">
                    Descuento del 10% Tercera Edad
                  </span>{" "}
                </td>
              </tr>
            ) : null}

            <tr>
              <td>
                <b>Subtotal:</b>
              </td>
              <td>{(parseFloat(calculateTotal()) / 1.15).toFixed(2)} HNL</td>
            </tr>
            <tr>
              <td>
                <b>Total:</b>
              </td>
              <td>
                {(
                  parseFloat(calculateTotal()) -
                  (discountApplied ? calculateTotal() * 0.1 : 0)
                ).toFixed(2)}{" "}
                HNL
              </td>
            </tr>
            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
            <tr style={{ height: "20px" }}>
              <td
                colSpan={4}
                style={{ borderBottom: "1px solid transparent" }}
              ></td>
            </tr>
          </tbody>
        </table>

        <p style={{ color: "red" }}>
          código y cálculos pendientes de revisión ╥﹏╥
        </p>
        <div className="d-flex justify-content-center">
          {user.role === "ADMINISTRADOR" ? (
            <button
              className="btn btn-primary mb-4 w-100 d-flex align-items-center justify-content-center"
              disabled={!(calculateTotal() > 0)}
              onClick={handleVendAndPrintInvoice}
            >
              <h4 className="m-0">
                <i className="bi bi-cart-check-fill"></i> Vender e Imprimir
                Factura
              </h4>
            </button>
          ) : (
            <>
              {calculateTotal() > 0 ? (
                <div className="col-6" id="paypal-button-container"></div>
              ) : (
                <div
                  className="col-6"
                  id="paypal-button-container"
                  style={{ pointerEvents: "none" }}
                ></div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres enviar esta orden de venta?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleVendAndPrintInvoice}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalesPurchaseCheckout;

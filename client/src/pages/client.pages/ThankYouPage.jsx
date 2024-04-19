import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ThankYouPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        navigate("/client/purchases");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4 shadow text-center">
      <h1 className="card-title text-center fw-bold pt-4 mb-4">
        ¡Muchas gracias por tu compra!
      </h1>
      <i
        className="bi bi-bag-check"
        style={{ fontSize: "10rem", color: "green" }}
      ></i>
      <div className="main-content">
        <p>
          Esperamos que disfrutes de tus productos. ¡Gracias por tu preferencia!
        </p>
        <p>
          Enviamos la factura a tu correo personal, serás redireccionado a tus
          compras en {countdown}...
        </p>
      </div>
    </div>
  );
};

export const ThankYouOrderPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        navigate("/client/orders");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4 shadow text-center">
      <h1 className="card-title text-center fw-bold pt-4 mb-4">
        ¡Tu orden de venta fue enviada exitosamente!
      </h1>
      <i
        className="bi bi-clipboard-check"
        style={{ fontSize: "10rem", color: "green" }}
      ></i>
      <div className="main-content">
        <p>
          Cuando tu orden sea procesada se te enviará un correo electrónico.
        </p>
        <p>
          serás redireccionado a tu lista de órdenes de venta en {countdown}...
        </p>
      </div>
    </div>
  );
};
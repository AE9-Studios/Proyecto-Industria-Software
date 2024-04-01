import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { getPurchaseOrdersWithReadFalse } from "../api/sales";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { CartContext } from "../context/ShoppingCartContext";

// eslint-disable-next-line react/prop-types
export const Cart = ({ role }) => {
  const { purchaseList } = useContext(CartContext);
  const { user } = useAuth();

  const isAdmin = role === "ADMINISTRADOR";
  const [unreadOrderCount, setUnreadOrderCount] = useState(0);

  useEffect(() => {
    const fetchUnreadOrderCount = async () => {
      try {
        const count = await getPurchaseOrdersWithReadFalse(user.role, user.id);
        setUnreadOrderCount(count.data.unreadPurchaseOrdersCount);
      } catch (error) {
        console.error(
          "Error al obtener el número de permisos no leídos:",
          error
        );
      }
    };

    fetchUnreadOrderCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <NavLink
          to={isAdmin ? "/admin/sales/" : "/client/home"}
          className="navbar-brand"
        >
          {isAdmin ? "Ventas" : "Home"}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to={isAdmin ? "/admin/sales/new" : "/client/catalog"}
                className="nav-link active"
              >
                Catálogo
              </NavLink>
            </li>
            {!isAdmin ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to={isAdmin ? "/admin/sales/list" : "/client/purchases"}
                    className="nav-link active"
                  >
                    {isAdmin ? "Registro de compras" : "Mis compras"}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={isAdmin ? "/admin/sales/list" : "/client/orders"}
                    className="nav-link active position-relative"
                  >
                    {isAdmin ? (
                      "Registro de compras"
                    ) : (
                      <>
                        Órdenes
                        {unreadOrderCount > 0 ? (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unreadOrderCount}
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <NavLink
          to={isAdmin ? "/admin/sales/checkout" : "/client/checkout"}
          className="text-decoration-none"
        >
          <div className="d-flex align-items-center">
            {purchaseList.length > 0 ? (
              <>
                <span className="badge bg-primary fs-7">
                  {purchaseList.length}
                </span>
                <i className="bi bi-cart-fill fs-3"></i>
              </>
            ) : (
              <>
                <span className="badge bg-danger fs-7">
                  {purchaseList.length}
                </span>
                <i className="bi bi-cart fs-3"></i>
              </>
            )}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

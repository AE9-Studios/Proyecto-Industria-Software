import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/ShoppingCartContext";
import PropTypes from "prop-types";

export const Cart = () => {
  const { purchaseList } = useContext(CartContext);
  const { user } = useAuth();

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [
      { title: "Volver", url: "/admin/sales ", icon: "bi bi-arrow-left-circle-fill" },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
      { title: "Tienda", url: "/admin/sales/new", icon: "bi bi-shop" },
      { title: "Carrito", url: "/admin/sales/checkout", icon: "bi bi-cart-fill" },
    ];
  } else {
    list = [
      { title: "Home", url: "/client/home", icon: "bi bi-house-fill" },
      { title: "Tienda", url: "/client/catalog", icon: "bi bi-shop" },
      { title: "Carrito", url: "/client/checkout", icon: "bi bi-cart-fill" },
    ];
  }

  const totalQuantity = purchaseList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BottomNavigation
      list={list}
      totalQuantity={totalQuantity}
      style={{ zIndex: 1000 }}
    />
  );
};

const BottomNavigation = ({ list, totalQuantity }) => {
  const path = window.location.pathname;

  return (
    <div>
      <div className="bottom-navigation-space"></div>
      <div className="bottom-navigation">
        {list.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={`bottom-navigation-item ${
              path === item.url ? "active" : ""
            }`}
          >
            <i
              className={`${
                item.icon === "bi bi-cart-fill"
                  ? totalQuantity > 0
                    ? "bi bi-cart-fill"
                    : "bi bi-cart"
                  : item.icon
              } fw-500 fs-3 bottom-navigation-item-icon`}
            >
              {item.title === "Carrito" && <span>{totalQuantity}</span>}
            </i>
            <p className="bottom-navigation-item-text">{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  list: PropTypes.array.isRequired,
  totalQuantity: PropTypes.number.isRequired,
};

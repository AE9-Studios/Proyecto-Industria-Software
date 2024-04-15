import { createContext, useReducer, useEffect, useState } from "react";
import { getProducts } from "../api/inventory";

export const CartContext = createContext();

export const ProductContext = createContext();

const initialState = [];

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({ children }) => {
  const purchaseReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case "[CART] Add Purchase":
        return [...state, action.payload];
      case "[CART] Increase Purchase Quantity":
        return state.map((item) => {
          const cant = item.quantity + 1;
          if (item.Id === action.payload) return { ...item, quantity: cant };
          return item;
        });
      case "[CART] Decrease Purchase Quantity":
        return state.map((item) => {
          const cant = item.quantity - 1;
          if (item.Id === action.payload && item.quantity > 1)
            return { ...item, quantity: cant };
          return item;
        });
      case "[CART] Delete Purchase":
        return state.filter((purchase) => purchase.Id !== action.payload);
      default:
        return state;
    }
  };

  const [purchaseList, dispatch] = useReducer(purchaseReducer, initialState);

  const addPurchase = (compra) => {
    compra.quantity = 1;
    const action = {
      type: "[CART] Add Purchase",
      payload: compra,
    };
    dispatch(action);
  };
  const increaseQuantity = (Id) => {
    const action = {
      type: "[CART] Increase Purchase Quantity",
      payload: Id,
    };
    dispatch(action);
  };
  const decreaseQuantity = (Id) => {
    const action = {
      type: "[CART] Decrease Purchase Quantity",
      payload: Id,
    };
    dispatch(action);
  };
  const deletePurchase = (Id) => {
    const action = {
      type: "[CART] Delete Purchase",
      payload: Id,
    };
    dispatch(action);
  };

  return (
    <CartContext.Provider
      value={{
        purchaseList,
        addPurchase,
        increaseQuantity,
        decreaseQuantity,
        deletePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProductos = async () => {
    const response = await getProducts();
    setProducts(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

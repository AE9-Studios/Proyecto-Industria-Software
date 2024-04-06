import { createContext, useReducer, useEffect, useState } from "react";

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
          if (item.id === action.payload) return { ...item, quantity: cant };
          return item;
        });
      case "[CART] Decrease Purchase Quantity":
        return state.map((item) => {
          const cant = item.quantity - 1;
          if (item.id === action.payload && item.quantity > 1)
            return { ...item, quantity: cant };
          return item;
        });
      case "[CART] Delete Purchase":
        return state.filter((purchase) => purchase.id !== action.payload);
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
  const increaseQuantity = (id) => {
    const action = {
      type: "[CART] Increase Purchase Quantity",
      payload: id,
    };
    dispatch(action);
  };
  const decreaseQuantity = (id) => {
    const action = {
      type: "[CART] Decrease Purchase Quantity",
      payload: id,
    };
    dispatch(action);
  };
  const deletePurchase = (id) => {
    const action = {
      type: "[CART] Delete Purchase",
      payload: id,
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
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
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

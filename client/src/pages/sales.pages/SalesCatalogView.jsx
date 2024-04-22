import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/ShoppingCartContext";
import { CartContext } from "../../context/ShoppingCartContext";
import CardProducts from "../../components/CardProduct";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";

const SalesCatalogView = () => {
  const { user } = useAuth();
  const { products } = useContext(ProductContext);
  const { addPurchase, purchaseList, deletePurchase } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleAdd = (purchase) => {
    addPurchase(purchase);
  };

  const handleRemove = (id) => {
    deletePurchase(id);
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4  text-center">
        <h1 className="text-center">Catálogo de Classic Vision</h1>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row justify-content-center">
          {filteredProducts.map((product) => (
            <CardProducts
              key={product.Id}
              image={
                product.Image
                  ? `http://localhost:3000/api/img/products/${product.Image}` //dev
                  : // ? `https://classic-vision.alhanisespinal.tech/api/img/products/${product.Image}` //deploy
                    "/noimage.jpg"
              }
              title={product.Name}
              description={product.Description}
              price={product.Price_Buy}
              handleAdd={() => handleAdd(product)}
              handleRemove={() => handleRemove(product.Id)}
              inCart={purchaseList.some((item) => item.Id === product.Id)}
            ></CardProducts>
          ))}
        </div>
      </div>
      <BottomNavigation list={list} />
    </>
  );
};

export default SalesCatalogView;

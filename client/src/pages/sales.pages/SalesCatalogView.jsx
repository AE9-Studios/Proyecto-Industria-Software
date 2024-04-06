import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/ShoppingCartContext";
import { CartContext } from "../../context/ShoppingCartContext";
import CardProducts from "../../components/CardProduct";

const SalesCatalogView = () => {
  const { products } = useContext(ProductContext);
  const { addPurchase, purchaseList, deletePurchase } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = (purchase) => {
    addPurchase(purchase);
  };

  const handleRemove = (id) => {
    deletePurchase(id);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4 shadow text-center">
        <h1 className="text-center">Productos de prueba dx</h1>

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
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              handleAdd={() => handleAdd(product)}
              handleRemove={() => handleRemove(product.id)}
              inCart={purchaseList.some((item) => item.id === product.id)}
            ></CardProducts>
          ))}
        </div>
      </div>
    </>
  );
};

export default SalesCatalogView;

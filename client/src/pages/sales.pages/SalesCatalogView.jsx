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
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4 mb-4 pt-4 pb-4 bg-white rounded-4 shadow text-center">
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
                product.image
                  ? product.image
                  : "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
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
    </>
  );
};

export default SalesCatalogView;

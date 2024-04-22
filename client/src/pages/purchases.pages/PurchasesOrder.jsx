import { useState, useEffect } from "react";
import { getProducts } from "../../api/inventory";
import { createOrder } from "../../api/purchases";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import BottomNavigation from "../../components/BottomNavigation";

function PurchasesOrder() {
  const list = [
    {
      title: "Volver",
      url: "/admin/purchases",
      icon: "bi bi-arrow-left-circle-fill",
    },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill" },
  ];
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sendingData, setSendingData] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    if (selectedProduct && quantity > 0) {
      setOrderItems([
        ...orderItems,
        { product: selectedProduct, quantity: quantity },
      ]);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  const handleRemoveItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handlePlaceOrder = async () => {
    setSendingData(true);
    try {
      const response = await createOrder({ items: orderItems });
      console.log(response.data.message);
      navigate("/admin/purchases/list");
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    } finally {
      setSendingData(false);
    }
  };

  const total = orderItems.reduce(
    (acc, item) => acc + item.product.Price_Buy * item.quantity,
    0
  );

  return (
    <div className="mt-4 bg-white rounded-4 ">
      <div className="container px-2">
        <h2 className="card-title text-center fw-bold mb-4">Realizar Pedido</h2>

        <div className="row mb-3 container p-2 m-2">
          <div className="col">
            <div className="d-flex align-items-center">
              <select
                id="productSelect"
                className="form-select me-3"
                value={selectedProduct ? selectedProduct.Id : ""}
                onChange={(e) => {
                  const productId = parseInt(e.target.value);
                  const selectedProduct = products.find(
                    (product) => product.Id === productId
                  );
                  setSelectedProduct(selectedProduct);
                }}
              >
                <option value="">Seleccionar Producto</option>
                {products.map((product) => (
                  <option key={product.Id} value={product.Id}>
                    {product.Name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="quantityInput"
                className="form-label me-2 mb-0 fw-bold"
              >
                Cantidad:
              </label>
              <input
                id="quantityInput"
                type="number"
                className="form-control me-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
              />
              <button className="btn btn-primary" onClick={handleAddItem}>
                Añadir
              </button>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="table-responsive ">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Categoría</th>
                <th>Marca</th>
                <th>Proveedor</th>
                <th>Precio Compra</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.Name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.Category.Name}</td>
                  <td>{item.product.Brand}</td>
                  <td>{item.product.Supplier.Name}</td>
                  <td>{item.product.Price_Buy} HNL</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <p className="mt-3">
          <strong>Total:</strong> {total} HNL
        </p>
        <button
          className="w-100 btn btn-success mt-3 py-2 px-5 rounded-4"
          onClick={openModal}
          disabled={orderItems.length === 0}
        >
          Realizar Pedido
        </button>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {sendingData ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Enviando...</span>
              </Spinner>
              <p>
                Enviando la orden de compra a los proveedores, por favor
                espere...
              </p>
            </div>
          ) : (
            <>
              ¿Estás seguro de que deseas realizar este pedido?
              <br />
              <br />
              <p style={{ color: "red" }}>
                {" "}
                Se enviará un correo electrónico a los proveedores con la
                información de la orden de compra.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            disabled={sendingData}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
            disabled={sendingData}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomNavigation list={list} />
    </div>
  );
}

export default PurchasesOrder;

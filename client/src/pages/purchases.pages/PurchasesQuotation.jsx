import { useState, useEffect } from "react";
import { getSuppliers } from "../../api/inventory";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { requestQuotation } from "../../api/purchases";
import BottomNavigation from "../../components/BottomNavigation";

function PurchaseQuotation() {
  const list = [
    { title: "Volver", url: "/admin/purchases", icon: "bi bi-arrow-left-circle-fill" },
    { title: "Panel", url: "/admin/home", icon: "bi bi-house-fill" },
  ]
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const res = await getSuppliers();
        setSuppliers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSuppliers();
  }, []);

  const handleAddItem = () => {
    if (selectedSupplier && productName.trim() !== "" && quantity > 0) {
      setOrderItems([
        ...orderItems,
        {
          supplier: selectedSupplier,
          productName: productName,
          quantity: quantity,
        },
      ]);
      setSelectedSupplier(null);
      setProductName("");
      setQuantity(1);
    }
  };

  const handleRemoveItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handlePlaceOrder = async () => {
    try {
      setSendingRequest(true);
      await requestQuotation({ quotationItems: orderItems });
      closeModal();
      navigate("/admin/purchases");
    } catch (error) {
      console.error("Error al solicitar cotización:", error);
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <div className=" mt-4">
      <div className="container mx-2">
        <h2 className="mb-4">Solicitar Cotización</h2>
        <div className="row mb-3">
          <div className="col">
            <label
              htmlFor="supplierSelect"
              className="form-label me-2 mb-0 fw-bold"
            >
              Seleccionar Proveedor:
            </label>
            <select
              id="supplierSelect"
              className="form-select me-3"
              value={selectedSupplier ? selectedSupplier.Id : ""}
              onChange={(e) => {
                const supplierId = parseInt(e.target.value);
                const selectedSupplier = suppliers.find(
                  (supplier) => supplier.Id === supplierId
                );
                setSelectedSupplier(selectedSupplier);
              }}
            >
              <option value="">Seleccionar Proveedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.Id} value={supplier.Id}>
                  {supplier.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <label
              htmlFor="productNameInput"
              className="form-label me-2 mb-0 fw-bold"
            >
              Producto:
            </label>
            <input
              id="productNameInput"
              type="text"
              className="form-control me-3"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
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
        <br />
        <hr />
        <br />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.supplier.Name}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
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
        <button
          className="btn btn-success"
          onClick={openModal}
          disabled={orderItems.length === 0 || sendingRequest}
        >
          Solicitar Cotización
        </button>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {sendingRequest ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Enviando...</span>
              </Spinner>
              <p>Enviando solicitud de cotización, por favor espere...</p>
            </div>
          ) : (
            <>
              ¿Estás seguro de que deseas realizar este pedido?
              <br />
              <br />
              <p style={{ color: "red" }}>
                {" "}
                Se enviará un correo electrónico a cada uno de los proveedores
                con la información de los productos para solicitar una
                cotización.
              </p>{" "}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            disabled={sendingRequest}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
            disabled={sendingRequest}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomNavigation list={list} />
    </div>
  );
}

export default PurchaseQuotation;

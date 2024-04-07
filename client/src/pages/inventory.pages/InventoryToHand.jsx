import React, { useEffect, useState } from 'react'
import { getInventory, getProducts, updateInventory } from '../../api/inventory';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const InventoryToHand = () => {

    const [inventory, setInvetory] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [movement, setMovement] = useState(null);

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm()

    const handleClose = () => {
        setShowModal(false)
        setMovement(null);
    };
    const handleShow = (movement) => {
        setShowModal(true);
        setMovement(movement);
        getProduct();
        console.log(movement);
    };

    const getInventoryFunc = async () => {
        try {
            const res = await getInventory();
            setInvetory(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getProduct = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const edit_reorder = async () => {
        try {
            const res = await updateInventory({
                Id: movement.Id,
                Product_Fk: movement.Product_Fk,
                Stock: movement.Stock,
                Min_Stock: document.getElementById('min_stock').value ? parseInt(document.getElementById('min_stock').value) : movement.Min_Stock,
                State: movement.State,
                Description: movement.Description,
            });
            setShowModal(false);
            alert('Punto de reorden actualizado');
            getInventoryFunc();
        } catch (error) {
            alert('Error al actualizar el punto de reorden');
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            getInventoryFunc();
        } catch (error) {
            console.log(error);
        }
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className='' >
            <div>Espacio para el menu </div>
            <div className="container mt-4 bg-white rounded-4  table-responsive" >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="col">
                        <h1 className="text-center mt-3 p-2">Inventario disponible</h1>
                    </div>
                    <div className="col">
                        <a className='btn btn-success' href='/admin/purchases' ><i className="bi bi-plus-square-fill"></i> Pedir Producto</a>

                    </div>
                </div>
                <br />
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Compra</th>
                            <th scope="col">Precio Venta</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement.Product.Name}</td>
                                    <td>{movement.Product.Supplier.Name}</td>
                                    <td>{movement.Stock}</td>
                                    <td>{movement.Product.Price_Buy}</td>
                                    <td>{movement.Product.Price_Sell}</td>
                                    <td>{movement.Updated_At}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginate(currentPage - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPage === Math.ceil(inventory.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginate(currentPage + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar {movement ? movement.Product.Name : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="form-group">
                            <div className='p-2 mb-3 container'>
                                <label className="form-label">Producto</label>
                                <select className="form-control" {...register('Name', { required: true })}>
                                    <option value="" hidden defaultValue>{movement ? movement.Product.Name : ''}</option>
                                    {
                                        products.map((product, index) => (
                                            <option key={index} value={product.Id}>{product.Name}</option>
                                        ))
                                    }
                                </select>
                                {/* {
                                    formErrors.Name && <span className="form-text text-danger">Seleccione el producto</span>
                                } */}
                            </div>

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={edit_reorder}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default InventoryToHand
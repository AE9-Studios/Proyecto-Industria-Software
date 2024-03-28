import React, { useEffect, useState } from 'react'
import { getInventory, updateInventory } from '../../api/inventory';
import { Button, Modal } from 'react-bootstrap';
import { get } from 'react-hook-form';

const Reorder = () => {

    const [inventory, setInvetory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [movement, setMovement] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = (movement) => {
        setShowModal(true);
        setMovement(movement);
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

    const edit_reorder = async () => {
        try {
            const res = await updateInventory(                {
                Id: movement.Id,
                Product_Fk: movement.Product_Fk,
                Stock: movement.Stock,
                Min_Stock: document.getElementById('min_stock').value ? parseInt(document.getElementById('min_stock').value): movement.Min_Stock,
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
            <div className="container mt-4 bg-white rounded-4 shadow table-responsive" >
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Punto de reorden</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement.Product.Name}</td>
                                    <td>{movement.Stock}</td>
                                    <td> {movement.Min_Stock}</td>
                                    <td onClick={() => handleShow(movement)}><i className="edit-btn bi bi-pencil-square"></i>
                                    </td>

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
                    <Modal.Title>Editar punto de reorden para {movement ? movement.Product.Name : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ingrese el nuevo punto de reorden:</p>
                    <input id='min_stock' type="number" className="form-control" placeholder={`Punto de reorden actual ${movement ? movement.Min_Stock : 0} unidades`} />
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

export default Reorder
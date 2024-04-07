import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { getMovement } from '../../api/inventory';

const InventoryMovement = () => {
    const { user } = useAuth();
    const [inventoryMovement, setInventoryMovement] = useState([]);
    const [error, setError] = useState([]);


    const getInventoryMovement = async () => {
        try {
            const res = await getMovement();
            setInventoryMovement(res.data);
            console.log(res.data);
        } catch (error) {
            setError(error.response.data)
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            getInventoryMovement();
        } catch (error) {
            console.log(error);
        }
    }, []);



    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventoryMovement.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='' >
            <div>Espacio para el menu </div>
            <div className="container mt-4 bg-white rounded-4  table-responsive" >
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Estado</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Product</th>
                            <th scope="col">Prooveedor</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((movement, index) => (
                                <tr key={index} className={movement.State === 'ENTRADA' ? 'table-info' : 'table-warning'}>
                                    <td>{movement.State}</td>
                                    <td>{movement.Quantity}</td>
                                    <td>{movement.Product.Name}</td>
                                    <td>{movement.Product.Supplier.Name}</td>
                                    <td>{movement.Description}</td>
                                    <td>{movement.Created_At}</td>
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
                        {/* {Array.from({ length: Math.ceil(inventoryMovement.length / itemsPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i} onClick={() => paginate(i + 1)}>
                                <a className="page-link">{i + 1}</a>
                            </li>
                        ))} */}
                        <li className={`page-item ${currentPage === Math.ceil(inventoryMovement.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginate(currentPage + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>
        </div>
    );
}

export default InventoryMovement
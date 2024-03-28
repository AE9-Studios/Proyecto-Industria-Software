import React, { useEffect, useState } from 'react'
import { getInventory } from '../../api/inventory';

const Inventory = () => {

    const [inventory, setInvetory] = useState([]);

    const getInventoryFunc = async () => {
        try {
            const res = await getInventory();
            setInvetory(res.data);
        }
        catch (error) {
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
    console.log(currentItems);
    console.log(inventory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='' >
            <div>Espacio para el menu </div>
            <div className="container mt-4 bg-white rounded-4 shadow table-responsive" >
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
        </div>
    )
}

export default Inventory
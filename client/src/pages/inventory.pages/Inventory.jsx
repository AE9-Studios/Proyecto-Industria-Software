import React, { useEffect, useState } from 'react'
import { createCategory, createProduct, createSupplier, deleteCategory, deleteProduct, deleteSupplier, getCategory, getInventory, getProducts, getSuppliers } from '../../api/inventory';
import { Button, Modal } from 'react-bootstrap';
import BottomNavigation from '../../components/BottomNavigation';

const Inventory = () => {

    const list = [
        {
            title: 'Volver',
            url: '/admin/home',
            icon: 'bi bi-arrow-left-circle-fill',
        },
        {
            title: 'Panel',
            url: '/admin/home',
            icon: 'bi bi-house-fill',
        },
    ]

    const [inventory, setInvetory] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [showModalCat, setShowModalCat] = useState(false);
    const [showModalSup, setShowModalSup] = useState(false);
    const [showModalProd, setShowModalProd] = useState(false);

    const handleCloseCat = () => setShowModalCat(false);
    const handleShowCat = () => setShowModalCat(true);

    const handleCloseSup = () => setShowModalSup(false);
    const handleShowSup = () => setShowModalSup(true);

    const handleCloseProd = () => setShowModalProd(false);
    const handleShowProd = () => setShowModalProd(true);


    const getInventoryFunc = async () => {
        try {
            const res = await getInventory();
            setInvetory(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const newProduct = async () => {
        try {
            const res = await createProduct({
                Name: document.getElementById('name-prod').value,
                Description: document.getElementById('desp-prod').value,
                Brand: document.getElementById('brand-prod').value,
                Price_Buy: parseInt(document.getElementById('price-buy-prod').value),
                Price_Sell: parseInt(document.getElementById('price-sell-prod').value),
                Category_Fk: parseInt(document.getElementById('category-prod').value),
                Supplier_Fk: parseInt(document.getElementById('supplier-prod').value),
                file: document.getElementById('file').files[0]
            });
            console.log(document.getElementById('file').files[0]);
            console.log(res);
            setShowModalProd(false);
            alert('Producto creado');
            getProductFunc();
        } catch (error) {
            alert('Error al crear el producto');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }

    const getProductFunc = async (id) => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    const deletePrductFunc = async (id) => {
        try {
            const res = await deleteProduct(id);
            alert('Producto eliminado');
            getProductFunc();
        } catch (error) {
            alert('Error al eliminar el producto');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }

    const getSuppliersFunc = async () => {
        try {
            const res = await getSuppliers();
            setSuppliers(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const newSupplier = async () => {
        try {
            const res = await createSupplier({
                Name: document.getElementById('name-sup').value,
                Phone: document.getElementById('phone-sup').value,
                Email: document.getElementById('email-sup').value,
                Address: document.getElementById('address-sup').value
            });
            alert('Proveedor creado');
            getSuppliersFunc();
            setShowModalSup(false);
        } catch (error) {
            alert('Error al crear el proveedor');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }

    const deleteSupplierFunc = async (id) => {
        try {
            const res = await deleteSupplier(id);
            alert('Proveedor eliminado');
            getSuppliersFunc();
        } catch (error) {
            alert('Error al eliminar el proveedor');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }


    const getCategoryFunc = async () => {
        try {
            const res = await getCategory();
            setCategories(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const newCategory = async () => {
        try {
            const res = await createCategory({
                Name: document.getElementById('name-cat').value,
                Description: document.getElementById('desp-cat').value
            });
            setShowModalCat(false);
            alert('Categoria creada');
            getCategoryFunc();
        } catch (error) {
            alert('Error al crear la categoria');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }

    const deleteCategoryFunc = async (id) => {
        try {
            const res = await deleteCategory(id);
            alert('Categoria eliminada');
            getCategoryFunc();
        } catch (error) {
            alert('Error al eliminar la categoria');
            error.response.data.map((err) => alert(err));
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            getInventoryFunc();
            getSuppliersFunc();
            getCategoryFunc();
            getProductFunc();
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(products);




    const [currentPageInv, setCurrentPageInv] = useState(1);
    const [itemsPerPageInv, setItemsPerPageInv] = useState(10);
    const indexOfLastItemInv = currentPageInv * itemsPerPageInv;
    const indexOfFirstItemInv = indexOfLastItemInv - itemsPerPageInv;
    const currentItemsInv = products.slice(indexOfFirstItemInv, indexOfLastItemInv);
    const paginateInv = (pageNumber) => setCurrentPageInv(pageNumber);

    const [currentPageSup, setCurrentPageSup] = useState(1);
    const [itemsPerPageSup, setItemsPerPageSup] = useState(10);
    const indexOfLastItemSup = currentPageSup * itemsPerPageSup;
    const indexOfFirstItemSup = indexOfLastItemSup - itemsPerPageSup;
    const currentItemsSup = suppliers.slice(indexOfFirstItemSup, indexOfLastItemSup);
    const paginateSup = (pageNumber) => setCurrentPageSup(pageNumber);

    const [currentPageCat, setCurrentPageCat] = useState(1);
    const [itemsPerPageCat, setItemsPerPageCat] = useState(10);
    const indexOfLastItemCat = currentPageCat * itemsPerPageCat;
    const indexOfFirstItemCat = indexOfLastItemCat - itemsPerPageCat;
    const currentItemsCat = categories.slice(indexOfFirstItemCat, indexOfLastItemCat);
    const paginateCat = (pageNumber) => setCurrentPageCat(pageNumber);


    return (
        <div className='pb-4' >
            <div className="container mt-4 bg-white rounded-4 table-responsive" >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="col">
                        <h1 className="text-center mt-3 p-2">Productos</h1>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' onClick={handleShowProd}><i className="bi bi-plus-square-fill"></i> Nuevo Producto</button>

                    </div>
                </div>
                <br />
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Precio Compra</th>
                            <th scope="col">Precio Venta</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItemsInv.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement.Name}</td>
                                    <td>{movement.Supplier.Name}</td>
                                    <td>{movement.Brand}</td>
                                    <td>{movement.Price_Buy}</td>
                                    <td>{movement.Price_Sell}</td>
                                    <td>{movement.Updated_At}</td>
                                    <td><button className='btn btn-danger' onClick={() => deletePrductFunc(movement.Id)}><i className="bi bi-trash"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPageInv === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateInv(currentPageInv - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPageInv === Math.ceil(products.length / itemsPerPageInv) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateInv(currentPageInv + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>
            <hr />

            <div className="container mt-4 bg-white rounded-4  table-responsive" >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="col">
                        <h1 className="text-center mt-3 p-2">Proveedores</h1>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' onClick={handleShowSup}><i className="bi bi-plus-square-fill"></i> Nuevo Proveedor</button>

                    </div>
                </div>
                <br />
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItemsSup.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement.Name}</td>
                                    <td>{movement.Email}</td>
                                    <td>{movement.Phone}</td>
                                    <td>{movement.Address}</td>
                                    <td>{movement.Updated_At}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteSupplierFunc(movement.Id)}><i className="bi bi-trash"></i></button></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPageSup === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateSup(currentPageSup - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPageSup === Math.ceil(suppliers.length / itemsPerPageSup) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateSup(currentPageSup + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>
            <hr />

            <div className="container mt-4 bg-white rounded-4  table-responsive" >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="col">
                        <h1 className="text-center mt-3 p-2">Categorias</h1>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' onClick={handleShowCat}><i className="bi bi-plus-square-fill"></i> Nueva Categoria</button>

                    </div>
                </div>
                <br />
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItemsCat.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement.Name}</td>
                                    <td>{movement.description}</td>
                                    <td>{movement.Updated_At}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteCategoryFunc(movement.Id)}><i className="bi bi-trash"></i></button></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPageCat === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateCat(currentPageCat - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPageCat === Math.ceil(categories.length / itemsPerPageCat) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateCat(currentPageCat + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>

            <Modal show={showModalCat} onHide={handleCloseCat}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear nueva Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nombre</p>
                    <input id='name-cat' type="text" className="form-control" placeholder={`Ingrese el nombre de la categoria`} />
                    <br />
                    <p>Descripción</p>
                    <textarea id='desp-cat' type="text" className="form-control" placeholder={`Describa la categoria`} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCat}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={newCategory}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalSup} onHide={handleCloseSup}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir un nuevo proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nombre</p>
                    <input id='name-sup' type="text" className="form-control" placeholder={`Ingrese el nombre del proveedor`} />
                    <br />
                    <p>Telefono</p>
                    <input id='phone-sup' type="text" className="form-control" placeholder={`Ingrese el telefono del proveedor`} />
                    <br />
                    <p>Email</p>
                    <input id='email-sup' type="mail" className="form-control" placeholder={`Ingrese el email del proveedor`} />
                    <br />
                    <p>Dirección</p>
                    <textarea id='address-sup' type="text" className="form-control" placeholder={`Ingrese la dirección del proveedor`} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSup}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={newSupplier}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalProd} onHide={handleCloseProd}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir un nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nombre</p>
                    <input id='name-prod' type="text" className="form-control" placeholder={`Ingrese el nombre del producto`} />
                    <br />
                    <p>Descripción</p>
                    <textarea id='desp-prod' type="text" className="form-control" placeholder={`Describa el producto`} />
                    <br />
                    <p>Marca</p>
                    <input id='brand-prod' type="text" className="form-control" placeholder={`Ingrese la marca del producto`} />
                    <br />
                    <p>Precio de compra</p>
                    <input id='price-buy-prod' type="number" className="form-control" placeholder={`Ingrese el precio de compra`} />
                    <br />
                    <p>Precio de venta</p>
                    <input id='price-sell-prod' type="number" className="form-control" placeholder={`Ingrese el precio de venta`} />
                    <br />
                    <p>Imagen</p>
                    <input id='file' type="file" className="form-control" />
                    <br />
                    <p>Categoria</p>
                    <select id='category-prod' className="form-select" aria-label="Default select example">
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category.Id}>{category.Name}</option>
                            ))
                        }
                    </select>
                    <br />
                    <p>Proveedor</p>
                    <select id='supplier-prod' className="form-select" aria-label="Default select example">
                        {
                            suppliers.map((supplier, index) => (
                                <option key={index} value={supplier.Id}>{supplier.Name}</option>
                            ))
                        }
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSup}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={newProduct}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        <BottomNavigation list={list} />
        </div>
    )
}

export default Inventory
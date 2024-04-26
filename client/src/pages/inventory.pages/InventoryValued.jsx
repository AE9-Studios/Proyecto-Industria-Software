import React, { useEffect, useState } from 'react'
import { getInventory } from '../../api/inventory';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BottomNavigation from '../../components/BottomNavigation';

const InventoryValued = () => {

    const list = [
        {
            title: 'Volver',
            url: '/admin/inventory',
            icon: 'bi bi-arrow-left-circle-fill',
        },
        {
            title: 'Panel',
            url: '/admin/home',
            icon: 'bi bi-house-fill',
        },
    ]

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

    console.log(inventory);

    return (
        <div className='' >
            <div className="container px-4 bg-white rounded-4 table-responsive" >
                <div className="col">
                    <div className="row">
                        <h2 className="text-center mt-3 p-2">Inventario valorado</h2>
                        <p>
                            El precio del inventario es es de: L.
                            <strong>
                                {
                                    inventory.map((item) => item.Product.Price_Sell * item.Stock).reduce((acc, curr) => acc + curr, 0)
                                }
                            </strong>
                        </p>
                        <p>
                            El dinero invertido en inventario es es de: L.
                            <strong>
                                {
                                    inventory.map((item) => item.Product.Price_Buy * item.Stock).reduce((acc, curr) => acc + curr, 0)
                                }
                            </strong>
                        </p>

                        <p>
                            La ganancia es de: L.
                            <strong>
                                {
                                    inventory.map((item) => item.Product.Price_Sell * item.Stock - item.Product.Price_Buy * item.Stock).reduce((acc, curr) => acc + curr, 0)
                                }
                            </strong>
                        </p>
                        <p>
                            La cantidad de productos en inventario es de:
                            <strong>
                                {
                                    inventory.map((item) => item.Stock).reduce((acc, curr) => acc + curr, 0)
                                }
                            </strong>
                        </p>
                        <p>
                            El precio promedio de los productos en inventario es de: L.
                            <strong>
                                {
                                    inventory.map((item) => item.Product.Price_Buy).reduce((acc, curr) => acc + curr, 0) / inventory.length
                                }
                            </strong>
                        </p>
                        <p>
                            El precio promedio de venta de los productos en inventario es de: L.
                            <strong>
                                {
                                    inventory.map((item) => item.Product.Price_Sell).reduce((acc, curr) => acc + curr, 0) / inventory.length
                                }
                            </strong>
                        </p>
                    </div>
                    <div className="row mb-4">
                        <div className="col mb-4">
                            <h3 className="text-center mt-3 p-2">Gráficas de inventario</h3>
                            <div className="row">
                                <div className="row justify-content-center">
                                    <h4 className="text-center">Valor de Inventario por producto</h4>
                                    <BarChart width={900} height={500} data={inventory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Product.Name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Valued_Inventory" fill="#8884d8" />
                                    </BarChart>
                                </div>
                                <div className="row justify-content-center">
                                    <h4 className="text-center">Stock</h4>
                                    <BarChart width={900} height={500} data={inventory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Product.Name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Stock" fill="#82ca9d" />
                                    </BarChart>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <BottomNavigation list={list} />
        </div>
    )
}

export default InventoryValued
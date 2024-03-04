import prisma from "../db.js";
import {http500} from "../libs/handleErrors.js";


export const getProducts = async (req, res) => {
    try {
        const products = await prisma.PRODUCT.findMany();
        res.status(200).json(products);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createInventoryMovement = async (req, res) => {
    try {
        const { productId, State, Quantity, Description } = req.body;
        const inventoryMovement = await prisma.iNVENTORY_MOVEMENT.create({
            data: {
                Product_Fk: productId,
                Quantity,
                State,
                Description
            }
        });
        res.status(200).json(inventoryMovement);
    } catch (error) {
        http500(error, req, res);
    }
}


export const getInventoryMovements = async (req, res) => {
    try {
        const inventoryMovements = await prisma.INVENTORY_MOVEMENT.findMany({
            include: {
                Product: {
                    select: {
                        Id: true, // Suponiendo que Id es el campo de identificación de tu producto
                        Name: true, // Otros campos que desees seleccionar
                        Description: true,
                        // Agrega otros campos de PRODUCT que desees seleccionar
                        Supplier: { // Incluimos el proveedor
                            select: {
                                Id: true,
                                Name: true,
                                // Otros campos del proveedor que desees seleccionar
                            }
                        }
                    }
                    
                }
            }
        });
        res.status(200).json(inventoryMovements);
    } catch (error) {
        http500(error, req, res);
    }
}


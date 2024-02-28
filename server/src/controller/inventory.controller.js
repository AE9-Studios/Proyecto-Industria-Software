import prisma from "../db.js";
import {http500} from "../libs/handleErrors.js";


export const getProducts = async (req, res) => {
    try {
        // const products = await prisma.Producto.findMany();
        res.status(200).json('products');
    } catch (error) {
        http500(error, req, res);
    }
}
import { Router } from "express";

import { createInventoryMovement, getInventoryMovements, getProducts } from "../controller/inventory.controller.js";

const router = Router();

router.get('/products', getProducts);
router.get('/movement', getInventoryMovements);
router.post('/movement', createInventoryMovement);


export default router;



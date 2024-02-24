import { Router } from "express";

import { getProducts } from "../controller/inventory.controller.js";

const router = Router();

router.get('/products', getProducts);

export default router;



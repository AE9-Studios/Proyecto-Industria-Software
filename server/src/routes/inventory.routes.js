import { Router } from "express";

import { createCategory, createInventoryMovement, createProduct, createPurchaseQuotation, createSupplier, deleteCategory, deleteInventoryMovement, deleteProduct, deletePurchaseQuotation, deleteSupplier, getCategory, getInventoryMovements, getProducts, getPurchaseQuotations, getSuppliers, updateCategory, updateInventoryMovement, updateProduct, updatePurchaseQuotation, updateSupplier } from "../controller/inventory.controller.js";

const router = Router();

router.get('/products', getProducts);
router.get('/movement', getInventoryMovements);
router.get('/suppliers', getSuppliers);
router.get('/category', getCategory);
router.get('/purchase-quotations', getPurchaseQuotations);

router.post('/movement', createInventoryMovement);
router.post('/category', createCategory);
router.post('/supplier', createSupplier);
router.post('/product', createProduct);
router.post('/purchase-quotations', createPurchaseQuotation);

router.put('/movement', updateInventoryMovement);
router.put('/product', updateProduct);
router.put('/supplier', updateSupplier);
router.put('/category', updateCategory);
router.put('/purchase-quotations', updatePurchaseQuotation);

router.delete('/movement/:id', deleteInventoryMovement);
router.delete('/product/:id', deleteProduct);
router.delete('/supplier/:id', deleteSupplier);
router.delete('/category/:id', deleteCategory);
router.delete('/purchase-quotations/:id', deletePurchaseQuotation);

export default router;



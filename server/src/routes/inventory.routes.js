import { Router } from "express";

import { createCategory, createInventory, createInventoryMovement, createProduct, createPurchaseQuotation, createSupplier, deleteCategory, deleteInventory, deleteInventoryMovement, deleteProduct, deletePurchaseQuotation, deleteSupplier, getCategory, getInventory, getInventoryMovements, getProducts, getPurchaseQuotations, getSuppliers, updateCategory, updateInventory, updateInventoryMovement, updateProduct, updatePurchaseQuotation, updateSupplier } from "../controller/inventory.controller.js";

const router = Router();

router.get('/products', getProducts);
router.get('/movement', getInventoryMovements);
router.get('/suppliers', getSuppliers);
router.get('/category', getCategory);
router.get('/purchase-quotations', getPurchaseQuotations);
router.get('/inventory', getInventory)

router.post('/movement', createInventoryMovement);
router.post('/category', createCategory);
router.post('/supplier', createSupplier);
router.post('/product', createProduct);
router.post('/purchase-quotations', createPurchaseQuotation);
router.post('/inventory', createInventory);

router.put('/movement', updateInventoryMovement);
router.put('/product', updateProduct);
router.put('/supplier', updateSupplier);
router.put('/category', updateCategory);
router.put('/purchase-quotations', updatePurchaseQuotation);
router.put('/inventory', updateInventory);

router.delete('/movement/:id', deleteInventoryMovement);
router.delete('/product/:id', deleteProduct);
router.delete('/supplier/:id', deleteSupplier);
router.delete('/category/:id', deleteCategory);
router.delete('/purchase-quotations/:id', deletePurchaseQuotation);
router.delete('/inventory/:id', deleteInventory);

export default router;



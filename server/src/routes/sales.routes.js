import { Router } from "express";
import { uploadInvoice, uploadOrder } from "../libs/uploadFile.js";

import { getAllInvoiceOrders, getAllOrders, getInvoiceAttachedFile, getInvoiceOrdersByClientId, getNextInvoiceIdAndCheckSeniority, getOrderAttachedFile, getPurchaseOrdersByClientId, getPurchaseOrdersWithReadFalse, saveInvoice, savePurchaseOrder, sendOrderReadyEmail, updateReadClientToFalseById } from "../controller/sales.controller.js";

const router = Router();

router.post("/save-invoice", uploadInvoice.single("invoice"), saveInvoice);
router.post("/save-order", uploadOrder.single("invoice"), savePurchaseOrder);
router.get("/invoice-order/:id", getInvoiceOrdersByClientId);
router.get("/all-invoice-order", getAllInvoiceOrders);
router.get("/purchase-order/:id", getPurchaseOrdersByClientId);
router.put("/purchase-order/:flag/:id", updateReadClientToFalseById);
router.get("/all-purchase-order", getAllOrders);
router.get("/order-file/:id", getOrderAttachedFile);
router.get("/invoice-file/:id", getInvoiceAttachedFile);
router.get("/invoice-details/:id", getNextInvoiceIdAndCheckSeniority);
router.get("/purchase-unread/:flag/:id", getPurchaseOrdersWithReadFalse);
router.put("/notification-order/:id", sendOrderReadyEmail);


export default router;

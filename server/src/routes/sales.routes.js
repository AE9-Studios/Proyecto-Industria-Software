import { Router } from "express";
import { uploadInvoice, uploadOrder } from "../libs/uploadFile.js";

import {
  getAllInvoiceOrders,
  getAllOrders,
  getInvoiceAttachedFile,
  getInvoiceOrdersByClientId,
  getNextInvoiceIdAndCheckSeniority,
  getOrderAttachedFile,
  getProducts,
  getPurchaseOrdersByClientId,
  getPurchaseOrdersWithReadFalse,
  saveInvoice,
  saveSaleOrder,
  sendOrderReadyEmail,
  updateReadClientToFalseById,
} from "../controller/sales.controller.js";

const router = Router();

router.post("/save-invoice", uploadInvoice.single("invoice"), saveInvoice);
router.post("/save-sale-order", uploadOrder.single("invoice"), saveSaleOrder);

router.get("/invoice-order/:id", getInvoiceOrdersByClientId);
router.get("/all-invoice-order", getAllInvoiceOrders);
router.get("/purchase-order/:id", getPurchaseOrdersByClientId);
router.get("/products", getProducts);
router.get("/all-purchase-order", getAllOrders);
router.get("/order-file/:id", getOrderAttachedFile);
router.get("/invoice-file/:id", getInvoiceAttachedFile);
router.get("/invoice-details/:id", getNextInvoiceIdAndCheckSeniority);
router.get("/purchase-unread/:flag/:id", getPurchaseOrdersWithReadFalse);

router.put("/purchase-order/:flag/:id", updateReadClientToFalseById);
router.put("/notification-order/:id", sendOrderReadyEmail);

export default router;

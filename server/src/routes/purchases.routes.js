import { Router } from "express";

import {
  savePurchaseOrder,
  getAllPurchaseOrdersWithDetails,
  getPurchaseOrderByIdWithDetails,
  updatePurchaseOrderAndInventory,
  rejectPurchaseOrder,
  getOrderReceipt,
  getApprovedPurchaseOrdersWithDetails,
  requestQuotation,
} from "../controller/purchases.controller.js";
import { uploadReceipt } from "../libs/uploadFile.js";

const router = Router();

router.post("/save-purchase-order", savePurchaseOrder);
router.get("/purchase-order", getAllPurchaseOrdersWithDetails);
router.put("/disabled-order", rejectPurchaseOrder);

router.put(
  "/purchase-order",
  uploadReceipt.single("receipt"),
  updatePurchaseOrderAndInventory
);
router.get("/purchase-order/:id", getPurchaseOrderByIdWithDetails);
router.get("/receipt-file/:id", getOrderReceipt);
router.get("/all-approved-purchase", getApprovedPurchaseOrdersWithDetails);
router.post("/request-quotation", requestQuotation);


export default router;

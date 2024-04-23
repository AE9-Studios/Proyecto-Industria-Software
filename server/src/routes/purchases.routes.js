import { Router } from "express";
import { uploadReceipt, upload } from "../libs/uploadFile.js";

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


const router = Router();

router.post("/save-purchase-order", upload.single("attachment_file"), savePurchaseOrder);
router.post("/request-quotation", upload.single("attachment_file"), requestQuotation);

router.get("/purchase-order", getAllPurchaseOrdersWithDetails);
router.get("/purchase-order/:id", getPurchaseOrderByIdWithDetails);
router.get("/receipt-file/:id", getOrderReceipt);
router.get("/all-approved-purchase", getApprovedPurchaseOrdersWithDetails);

router.put("/disabled-order", upload.single("attachment_file"), rejectPurchaseOrder);
router.put("/purchase-order", uploadReceipt.single("receipt"), updatePurchaseOrderAndInventory);

export default router;

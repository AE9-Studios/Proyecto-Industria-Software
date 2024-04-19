import axios from "./axios.js";

export const createOrder = (values) =>
  axios.post(`/purchases/save-purchase-order`, values);

export const getAllPurchaseOrdersWithDetails = (values) =>
  axios.get(`/purchases/purchase-order`, values);

export const getPurchaseOrderByIdWithDetails = (orderId) =>
  axios.get(`/purchases/purchase-order/${orderId}`);

export const requestQuotation = (values) =>
  axios.post(`/purchases/request-quotation`, values);

export const updatePurchaseOrderAndInventory = (formData) => {
  return axios.put(`/purchases/purchase-order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const rejectPurchaseOrder = (values) =>
  axios.put(`/purchases/disabled-order`, values);

export const getOrderReceipt = (receiptId) =>
  axios.get(`/purchases/receipt-file/${receiptId}`, {
    responseType: "blob",
  });

export const getApprovedPurchaseOrdersWithDetails = (values) =>
  axios.get(`/purchases/all-approved-purchase`, values);

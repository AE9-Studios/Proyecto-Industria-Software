import axios from "./axios.js";

export const getAllPurchaseOrdersWithDetails = (values) =>
  axios.get(`/purchases/purchase-order`, values);

export const getPurchaseOrderByIdWithDetails = (orderId) =>
  axios.get(`/purchases/purchase-order/${orderId}`);

export const getApprovedPurchaseOrdersWithDetails = (values) =>
  axios.get(`/purchases/all-approved-purchase`, values);

export const getOrderReceipt = (receiptId) =>
  axios.get(`/purchases/receipt-file/${receiptId}`, {
    responseType: "blob",
});

export const createOrder = (formData) => {
  return axios.post(`/purchases/save-purchase-order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePurchaseOrderAndInventory = (formData) => {
  return axios.put(`/purchases/purchase-order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestQuotation = (formData) => {
  return axios.post(`/purchases/request-quotation`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const rejectPurchaseOrder = (formData) => {
  return axios.put(`/purchases/disabled-order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


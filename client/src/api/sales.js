import axios from "./axios.js";

export const createOrder = (values) =>
  axios.post(`/sales/create-order`, values);

export const saveInvoice = (formData) => {
  return axios.post(`/sales/save-invoice`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const saveOrder = (formData) => {
  return axios.post(`/sales/save-order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getNextInvoiceIdAndCheckSeniority = (userId) =>
  axios.get(`/sales/invoice-details/${userId}`);

export const getInvoiceOrdersByClientId = (clientId) =>
  axios.get(`/sales/invoice-order/${clientId}`);

export const getInvoiceAttachedFile = (invoiceId) =>
  axios.get(`sales/invoice-file/${invoiceId}`, {
    responseType: "blob",
  });
export const getAllInvoiceOrders = () => axios.get(`/sales/all-invoice-order/`);

export const getAllPurchaseOrders = () =>
  axios.get(`/sales/all-purchase-order/`);

export const getPurchaseOrdersByClientId = (clientId) =>
  axios.get(`/sales/purchase-order/${clientId}`);

export const getOrderAttachedFile = (invoiceId) =>
  axios.get(`sales/order-file/${invoiceId}`, {
    responseType: "blob",
  });

export const getPurchaseOrdersWithReadFalse = (flag, userId) =>
  axios.get(`/sales/purchase-unread/${flag}/${userId}`);

export const updateReadClientToFalseById = (flag, orderId) =>
  axios.put(`/sales/purchase-order/${flag}/${orderId}`);

export const sendOrderReadyEmail = (orderId) =>
  axios.put(`/sales/notification-order/${orderId}`);

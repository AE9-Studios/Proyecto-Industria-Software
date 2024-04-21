import axios from "./axios.js";

export const getProducts = () => axios.get(`/inventory/products`);
export const getMovement = () => axios.get(`/inventory/movement`);
export const getSuppliers = () => axios.get(`/inventory/suppliers`);
export const getCategory = () => axios.get(`/inventory/category`);
export const getPurchaseQuotations = () => axios.get(`/inventory/purchase-quotations`);
export const getInventory = () => axios.get(`/inventory/inventory`);

export const createMovement = (movement) => axios.post(`/inventory/movement`, movement);
export const createCategory = (category) => axios.post(`/inventory/category`, category);
export const createSupplier = (supplier) => axios.post(`/inventory/supplier`, supplier);
export const createProduct = (product) => {
    const formData = new FormData();
    for (const key in product) {
        if (key === 'file') {
            formData.append(key, product[key]);
            console.log(product[key]);
        } else {
            formData.append(key, product[key]);
            console.log(product[key]);

        }
    }
    console.log(formData);
    return axios.post(`/inventory/product`, formData);
}
export const createPurchaseQuotation = (purchaseQuotation) => axios.post(`/inventory/purchase-quotations`, purchaseQuotation);
export const createInventory = (inventory) => axios.post(`/inventory/inventory`, formData);

export const updateMovement = (movement) => axios.put(`/inventory/movement`, movement);
export const updateProduct = (product) => axios.put(`/inventory/product`, product);
export const updateSupplier = (supplier) => axios.put(`/inventory/supplier`, supplier);
export const updateCategory = (category) => axios.put(`/inventory/category`, category);
export const updatePurchaseQuotation = (purchaseQuotation) => axios.put(`/inventory/purchase-quotations`, purchaseQuotation);
export const updateInventory = (inventory) => axios.put(`/inventory/inventory`, inventory);

export const deleteMovement = (id) => axios.delete(`/inventory/movement/${id}`);
export const deleteProduct = (id) => axios.delete(`/inventory/product/${id}`);
export const deleteSupplier = (id) => axios.delete(`/inventory/supplier/${id}`);
export const deleteCategory = (id) => axios.delete(`/inventory/category/${id}`);
export const deletePurchaseQuotation = (id) => axios.delete(`/inventory/purchase-quotations/${id}`);
export const deleteInventory = (id) => axios.delete(`/inventory/inventory/${id}`);

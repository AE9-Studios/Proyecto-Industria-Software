import axios from "./axios.js";

export const getMovement = () => axios.get(`/inventory/movement`);
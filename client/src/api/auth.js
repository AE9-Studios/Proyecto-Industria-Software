import axios from "./axios.js";

export const login = values => axios.post(`/auth/login`, values)
export const register = values => axios.post(`/auth/register`, values)
export const verify = (token) => axios.post(`/auth/verify`, token)

export const recoveryPassword = values => axios.post(`/auth/password-recovery`, values)
export const resetPassword = values => axios.post(`/auth/password-reset/password`, values)

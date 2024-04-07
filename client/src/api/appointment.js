import axios from "./axios.js";

export const createAppointmentSolicitation = values => axios.post(`/appointment/create-appointment-solicitation`, values)
export const getAppointmentsSolicitation = () => axios.get(`/appointment/get-appointment-solicitations`)
export const updateAppointmentSolicitation = (id, values) => axios.put(`/appointment/update-appointment-solicitation/${id}`, values)
export const deleteAppointmentSolicitation = id => axios.delete(`/appointment/delete-appointment-solicitation/${id}`)

export const createAppointment = values => axios.post(`/appointment/create-appointment`, values)
export const getAppointments = () => axios.get(`/appointment/get-appointments`)
export const updateAppointment = (id, values) => axios.put(`/appointment/update-appointment/${id}`, values)
export const deleteAppointment = id => axios.delete(`/appointment/delete-appointment/${id}`)

export const getAppointmentToClient = id => axios.get(`/appointment/get-appointment-to-client/${id}`)
export const getAppointmentsSolicitationToClient = id => axios.get(`/appointment/get-appointment-solicitation-to-client/${id}`)
export const getAppointmentToEmployee = id => axios.get(`/appointment/get-appointment-to-employee/${id}`)
export const getAppointmentsSolicitationToEmployee = id => axios.get(`/appointment/get-appointment-solicitation-to-employee/${id}`)
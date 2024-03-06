import axios from "./axios.js";

export const employeeList = () => axios.get(`/human-resources/employees`);

export const employeeCreate = (values) => axios.post(`/human-resources/employees`, values);

export const employeeCreateSchedule = (values) => axios.post(`/human-resources/create-schedule`, values);

export const scheduleList = () => axios.get(`/human-resources/schedule-list`);

export const employeeGet = (employeeId) =>  axios.get(`/human-resources/employees/${employeeId}`);

export const employeeUpdate = (values) => axios.put(`/human-resources/employees`, values);

export const employeeDisabled = (values) => axios.put(`/human-resources/disable-employee`, values);

export const employeeRequest = (formData) => {
    return axios.post(`/human-resources/permision`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });
  };
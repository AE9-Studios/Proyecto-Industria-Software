import axios from "./axios.js";

// * Empleados

export const getEmployees = () => axios.get(`/human-resources/employees`);

export const getEmployeeById = (employeeId) =>
  axios.get(`/human-resources/employee/${employeeId}`);

export const getEmployeeByUserId = (userId) =>
  axios.get(`/human-resources/employee-user/${userId}`);

export const getSalaryByEmployeeId = (employeeId) =>
  axios.get(`/human-resources/employee-salary/${employeeId}`);

export const createEmployees = (values) =>
  axios.post(`/human-resources/employee`, values);

export const updateEmployee = (values) =>
  axios.put(`/human-resources/employee`, values);

export const disableEmployee = (values) =>
  axios.put(`/human-resources/disable-employee`, values);

// * Horarios

export const getAllSchedules = () => axios.get(`/human-resources/schedules`);

export const getScheduleById = (scheduleId) =>
  axios.get(`/human-resources/schedule/${scheduleId}`);

export const saveSchedule = (values) =>
  axios.post(`/human-resources/schedule`, values);

export const updateSchedule = (scheduleId, values) =>
  axios.put(`/human-resources/schedule/${scheduleId}`, values);

export const deleteSchedule = (scheduleId) =>
  axios.delete(`/human-resources/schedule/${scheduleId}`);

// * Request

export const getRequestWithReadFalse = (flag, userId) =>
  axios.get(`/human-resources/request-unread/${flag}/${userId}`);

// * Permisos

export const getAllPermissions = () =>
  axios.get("/human-resources/permissions");

export const getPermissionById = (flag, permissionId) =>
  axios.get(`/human-resources/permission-data/${flag}/${permissionId}`);

export const getPermissionAttachedFile = (permissionId) =>
  axios.get(`human-resources/permission-file/${permissionId}`, {
    responseType: "blob",
  });
export const getPermissionsByEmployeeId = (employeeId) =>
  axios.get(`human-resources/permission-answer/${employeeId}`);

export const getApprovedPermissions = () =>
  axios.get("/human-resources/permissions-approved");

export const savePermissionRequest = (formData) => {
  return axios.post(`/human-resources/permission`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePermissionStateById = (permissionId, values) =>
  axios.put(`/human-resources/permission-data/${permissionId}`, values);

// * Vacaciones

export const getAllVacations = () => axios.get("/human-resources/vacations");

export const getVacationById = (flag, permissionId) =>
  axios.get(`/human-resources/vacation-data/${flag}/${permissionId}`);

export const getVacationsByEmployeeId = (employeeId) =>
  axios.get(`human-resources/vacation-answer/${employeeId}`);

export const getApprovedVacations = () =>
  axios.get("/human-resources/vacations-approved");

export const saveVacationRequest = (formData) => {
  return axios.post(`/human-resources/vacation`, formData);
};

export const updatedVacationById = (permissionId, values) =>
  axios.put(`/human-resources/vacation-data/${permissionId}`, values);

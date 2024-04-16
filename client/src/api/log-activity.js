import axios from "./axios.js";

export const sendDeviceToken = ({ token, userId }) =>
  axios.post(`activity-log/token`, { token, userId });

export const deleteTokenFromUser = ({ userId }) =>
  axios.delete(`activity-log/token`, { data: { userId } });


import { Router } from "express";
import { uploadRequest } from "../libs/uploadFile.js";
import {
  getEmployees,
  createEmployees,
  getEmployeeById,
  updateEmployee,
  disableEmployee,
  savePermissionRequest,
  saveSchedule,
  getAllSchedules,
  getPermissionAttachedFile,
  getAllPermissions,
  getPermissionById,
  updatePermissionStateById,
  getPermissionsByEmployeeId,
  getApprovedPermissions,
  getSalaryByEmployeeId,
  updateSchedule,
  getScheduleById,
  deleteSchedule,
  getEmployeeByUserId,
  saveVacationRequest,
  getAllVacations,
  getVacationById,
  updateVacationStateById,
  getVacationsByEmployeeId,
  getApprovedVacations,
  getRequestWithReadFalse,
} from "../controller/human-resources.controller.js";

const router = Router();

// * Empleados
router.get("/employees", getEmployees);
router.get("/employee/:id", getEmployeeById);
router.get("/employee-user/:id", getEmployeeByUserId);
router.get("/employee-salary/:id", getSalaryByEmployeeId);
router.post("/employee", createEmployees);
router.put("/employee", updateEmployee);
router.put("/disable-employee", disableEmployee);

// * Horarios
router.get("/schedules", getAllSchedules);
router.get("/schedule/:id", getScheduleById);
router.post("/schedule", saveSchedule);
router.put("/schedule/:id", updateSchedule);
router.delete("/schedule/:id", deleteSchedule);

// * Request
router.get("/request-unread/:flag/:id", getRequestWithReadFalse);

// * Permisos
router.get("/permissions", getAllPermissions);
router.get("/permission-data/:flag/:id", getPermissionById);
router.get("/permission-file/:id", getPermissionAttachedFile);
router.get("/permission-answer/:id", getPermissionsByEmployeeId);
router.get("/permissions-approved", getApprovedPermissions);
router.post("/permission", uploadRequest.single("attachedFile"), savePermissionRequest);
router.put("/permission-data/:id", updatePermissionStateById);

// * Vacaciones
router.get("/vacations", getAllVacations);
router.get("/vacation-data/:flag/:id", getVacationById);
router.get("/vacation-answer/:id", getVacationsByEmployeeId);
router.get("/vacations-approved", getApprovedVacations);
router.post("/vacation", saveVacationRequest);
router.put("/vacation-data/:id", updateVacationStateById);

export default router;

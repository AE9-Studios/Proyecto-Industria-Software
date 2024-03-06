import { Router } from "express";

import { getEmployees, createEmployees, getEmployeeById, updateEmployee, disableEmployee, savePermissionRequest, saveSchedule, getAllSchedules} from "../controller/human-resources.controller.js";
import { uploadRequest } from "../libs/uploadRequest.js";

const router = Router();

router.get('/employees', getEmployees);
router.get('/employees/:Id', getEmployeeById);
router.post('/employees', createEmployees);
router.put('/employees', updateEmployee);
router.put('/disable-employee', disableEmployee);
router.post('/create-schedule', saveSchedule);
router.get('/schedule-list', getAllSchedules);  
router.post('/permision', uploadRequest.single('attachedFile'), savePermissionRequest);

export default router;



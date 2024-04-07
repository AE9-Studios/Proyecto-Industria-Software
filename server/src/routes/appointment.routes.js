import { Router } from "express";

import {createAppointment, createAppointmentSolicitation, deleteAppointment, deleteAppointmentSolicitation, getAppointmentToClient, getAppointmentToEmployee, getAppointments, getAppointmentsSolicitation, updateAppointment, updateAppointmentSolicitation } from "../controller/appointment.controller.js";

const router = Router();

router.post("/create-appointment-solicitation", createAppointmentSolicitation);
router.get("/get-appointment-solicitations", getAppointmentsSolicitation);
router.put("/update-appointment-solicitation/:id", updateAppointmentSolicitation);
router.delete("/delete-appointment-solicitation/:id", deleteAppointmentSolicitation);

router.post("/create-appointment", createAppointment);
router.get("/get-appointments", getAppointments);
router.put("/update-appointment/:id", updateAppointment);
router.delete("/delete-appointment/:id", deleteAppointment);
router.get("/get-appointment-to-client/:id", getAppointmentToClient);
router.get("/get-appointment-to-employee/:id", getAppointmentToEmployee);



export default router;

import { Router } from "express";

import {createAppointment, createAppointmentSolicitation, getAppointmentToClient, getAppointmentToEmployee, getAppointments, getAppointmentsSolicitation } from "../controller/appointment.controller.js";

const router = Router();

router.post("/create-appointment-solicitation", createAppointmentSolicitation);
router.post("/create-appointment", createAppointment);

router.get("/get-appointment-to-client/:id", getAppointmentToClient);
router.get("/get-appointment-to-employee/:id", getAppointmentToEmployee);

router.get("/get-appointment-solicitations", getAppointmentsSolicitation);
router.get("/get-appointments", getAppointments);


export default router;

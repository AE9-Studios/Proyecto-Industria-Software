import { Router } from "express";
import { login, registerClient, verifyToken } from "../controller/auth.controller.js";

const router = Router();

router.post('/login', login);
router.post('/register', registerClient);

router.post('/verify', verifyToken)

export default router; // exportamos el router para poder usarlo en otros archivos
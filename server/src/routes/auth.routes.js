import { Router } from "express";
import { login, registerClient, logout, verifyToken } from "../controller/auth.controller.js";

const router = Router();

router.post('/login', login);
router.post('/register', registerClient);

router.get('/verify', verifyToken)
router.get('/logout', logout)

export default router; // exportamos el router para poder usarlo en otros archivos
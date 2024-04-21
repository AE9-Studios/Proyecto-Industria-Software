import { Router } from "express";
import { login, registerClient, verifyToken, recoveryPassword, resetPassword, resetPasswordPage } from "../controller/auth.controller.js";

const router = Router();

router.post('/login', login);
router.post('/register', registerClient);

router.post('/verify', verifyToken)

{/** Recuperación de contraseña*/}
router.post('/password-recovery', recoveryPassword)
router.post('/password-reset/password', resetPassword)
router.get('/password-reset', resetPasswordPage)

export default router; // exportamos el router para poder usarlo en otros archivos
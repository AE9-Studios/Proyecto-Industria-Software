import { Router } from "express";

import { addTokenToUser, deleteTokenFromUser } from "../controller/activity-log.controller.js";

const router = Router();

router.post("/token", addTokenToUser);
router.delete("/token", deleteTokenFromUser);


export default router;

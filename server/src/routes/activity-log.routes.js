import { Router } from "express";

import { addTokenToUser, deleteTokenFromUser, getActivityLogs } from "../controller/activity-log.controller.js";

const router = Router();

router.post("/token", addTokenToUser);
router.delete("/token", deleteTokenFromUser);
router.get("/all-activity", getActivityLogs);


export default router;

import express from "express";
import { createRecord, getRecords } from "../controllers/recordController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createRecord);
router.get("/all", authMiddleware, getRecords);

export default router;

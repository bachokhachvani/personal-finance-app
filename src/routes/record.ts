import express from "express";
import { createRecord } from "../controllers/recordController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createRecord);

export default router;

import express from "express";
import {
  createRecord,
  getFIlteredRecords,
  getRecords,
} from "../controllers/recordController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createRecord);
router.get("/all", authMiddleware, getRecords);
router.get("/filter", authMiddleware, getFIlteredRecords);

export default router;

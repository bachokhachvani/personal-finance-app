import express from "express";
import {
  createCategory,
  editCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createCategory);
router.patch("/edit", authMiddleware, editCategory);

export default router;

import express from "express";
import {
  createCategory,
  editCategoryByName,
  getAllCategories,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createCategory);
router.patch("/edit", authMiddleware, editCategoryByName);
router.get("/all", getAllCategories);

export default router;

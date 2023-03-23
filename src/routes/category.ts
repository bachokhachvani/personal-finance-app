import express from "express";
import {
  createCategory,
  editCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.patch("/edit", editCategory);

export default router;

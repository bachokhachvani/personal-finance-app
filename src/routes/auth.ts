import express from "express";
import {
  login,
  logout,
  passwordRecoveryController,
  signup,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetPassword", passwordRecoveryController);
router.get("/me", getMe);

export default router;

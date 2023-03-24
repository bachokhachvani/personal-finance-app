import express from "express";
import {
  login,
  logout,
  forgotPassword,
  signup,
  getMe,
  resetPasswordGet,
  resetPasswordPost,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:id/:token", resetPasswordGet);
router.post("/resetpassword/:id/:token", resetPasswordPost);

export default router;

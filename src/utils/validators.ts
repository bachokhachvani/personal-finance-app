import { body } from "express-validator";
import { CustomError } from "./cutomError.js";

// export const registerValidator = [
//   body("email").isEmail().withMessage("Invalid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),
// ];

// export const loginValidator = [
//   body("email").isEmail().withMessage("Invalid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),
// ];

export function validateEmail(value: string) {
  if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    throw new Error("Invalid email address");
  }

  return true;
}

export function validatePassword(value: string) {
  if (value.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  return true;
}

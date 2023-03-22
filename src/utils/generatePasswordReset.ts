import bcrypt from "bcrypt";
import { IUser } from "../models/User.js";

export const generatePasswordResetToken = async function (user: IUser) {
  const token = await bcrypt.hash(Date.now().toString(), 10);
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();
  return token;
};

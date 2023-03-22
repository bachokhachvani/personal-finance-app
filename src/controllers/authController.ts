import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User.js";
import User from "../models/User.js";
import { validateEmail, validatePassword } from "../utils/validators.js";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token: string = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "3h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "asdInternal server error" });
  }
};

export const login = async (req: Request, res: Response) => {};

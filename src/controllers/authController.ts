import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
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

    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "asdInternal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "3h",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ token });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const secret = process.env.JWT_SECRET! + user.password;

  const JWTtoken = jwt.sign({ userId: user._id }, secret, {
    expiresIn: "15m",
  });

  user.passwordResetToken = JWTtoken;

  console.log(
    "link",
    `http://localhost:3000/auth/resetpassword/${user._id}/${JWTtoken}`
  );

  res.cookie("resetToken", JWTtoken, {
    httpOnly: true,
  });
  res.json({
    link: `http://localhost:3000/auth/resetpassword/${user._id}/${JWTtoken}`,
  });
};

export const resetPasswordGet = async (req: Request, res: Response) => {
  const { id, token } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "user doesn't exists" });
  }

  const secret = process.env.JWT_SECRET! + user.password;

  try {
    const decodedToken = jwt.verify(token, secret);

    res.status(200).json({ userId: decodedToken });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

export const resetPasswordPost = async (req: Request, res: Response) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "user doesn't exists" });
  }
  const secret = process.env.JWT_SECRET! + user.password;
  try {
    const decodedToken = jwt.verify(token, secret);
    if (!password === password2) {
      return res.json({ message: "passwords doesn't match" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const token = req.headers.authorization!.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "there is no token!" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof decodedToken === "string") {
    return res.status(401).json({ message: "Authorization token is invalid" });
  }

  const userId = decodedToken.userId;
  const user = await User.findOne({ _id: userId });

  res.json({ message: user });
};

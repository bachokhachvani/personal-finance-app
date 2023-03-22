import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateEmail, validatePassword } from "../utils/validators";
const router = express.Router();
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!validateEmail(email) || !validatePassword(password)) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(201).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=users.js.map
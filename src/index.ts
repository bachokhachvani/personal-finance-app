import express from "express";
import cors from "cors";
import "./mongodb.ts";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/users", authRouter);
app.get("/", (req, res) => {
  res.send("Hello, worssld!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

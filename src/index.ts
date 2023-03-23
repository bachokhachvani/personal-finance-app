import express from "express";
import cors from "cors";
import "./mongodb.ts";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import recordRouter from "./routes/record.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/record", recordRouter);
app.get("/", (req, res) => {
  res.send("Hello, worssld!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

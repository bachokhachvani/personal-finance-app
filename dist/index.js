import express from "express";
import cors from "cors";
import "./mongodb.ts";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.get("/", (req, res) => {
    res.send("Hello, worssld!");
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
//# sourceMappingURL=index.js.map
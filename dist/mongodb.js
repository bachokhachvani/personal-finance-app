var _a;
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const URI = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "";
mongoose
    .connect(URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=mongodb.js.map
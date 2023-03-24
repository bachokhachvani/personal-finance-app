import mongoose, { Document, Schema } from "mongoose";
import { IRecord } from "./Record.js";
import { ICategory } from "./Category.js";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  records?: IRecord[];
  categoryData: ICategory;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("records", {
  ref: "Record",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model<IUser>("User", userSchema);

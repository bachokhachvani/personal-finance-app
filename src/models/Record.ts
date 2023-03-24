import mongoose, { Document, Schema } from "mongoose";
import Category, { ICategory } from "./Category.js";
import { IUser } from "./User.js";

export interface IRecord extends Document {
  description: string;
  amount: number;
  status: "Processing" | "Completed" | null;
  type: "Expense" | "Income";
  category?: ICategory;
  user: IUser;
  categoryData?: ICategory[];
}

const recordSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Expense", "Income"],
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: null,
      enum: ["Processing", "Completed", null],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
recordSchema.virtual("categoryData", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model<IRecord>("Record", recordSchema);

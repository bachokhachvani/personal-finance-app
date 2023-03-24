import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  includes(arg0: string): unknown;
  name: string;
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      default: "default",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", categorySchema);

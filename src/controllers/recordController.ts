import { Request, Response } from "express";
import Record from "../models/Record.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";
import User from "../models/User.js";

interface AuthRequest extends Request {
  user?: {
    _id?: string;
  };
}

export const createRecord = async (req: AuthRequest, res: Response) => {
  const { category } = req.body;
  const userId = req.user!._id;
  const userIdObject = new mongoose.Types.ObjectId(userId);

  try {
    if (!category) {
      const defaultCategoryExists = await Category.findOne({ name: "default" });

      if (!defaultCategoryExists) {
        const defaultCategory = new Category({ name: "default" });

        await defaultCategory.save();
        const record = {
          category: defaultCategory._id,
          user: userIdObject,
          ...req.body,
        };
        const newRecord = new Record({
          ...record,
        });
        await newRecord.save();
        res.status(200).json({ message: "new Record is created" });
        return;
      }
      const record = {
        category: defaultCategoryExists._id,
        user: userIdObject,
        ...req.body,
      };
      const newRecord = new Record({
        ...record,
      });

      await newRecord.save();

      res.status(200).json({ message: "new Record is created" });
      return;
    }

    const findCategory = await Category.findOne({ name: category });

    if (!findCategory) {
      res.status(400).json({ message: "there is no category with that name" });
      return;
    }

    const record = { ...req.body };
    if (req.body.type === "Expense" && !req.body.status) {
      res.status(404).json({ message: "expense should have status property" });
      return;
    }
    if (req.body.type === "Income" && req.body.status) {
      res.status(404).json({ message: "Income doesn't have status" });
      return;
    }

    const newRecord = new Record({
      ...record,
      category: findCategory._id,
      user: userIdObject,
    });

    await newRecord.save();
    res.status(200).json({ message: "new Record is created" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

export const getRecords = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const userIdObject = new mongoose.Types.ObjectId(userId);
  try {
    const user = await User.findById(userId)
      .populate({
        path: "records",
        populate: { path: "categoryData" },
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ records: user.records });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getFIlteredRecords = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const { startDate, endDate, ...others } = req.query;

  try {
    const user = await User.findById(userId)
      .populate({
        path: "records",
        match: {
          updatedAt: {
            $gte: new Date(startDate as string),
            $lte: new Date(endDate as string),
          },
          ...others,
        },
        options: {
          sort: { updatedAt: -1 },
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ records: user.records });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

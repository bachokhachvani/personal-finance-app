import { IRecord } from "../models/Record.js";
import { Request, Response } from "express";
import Record from "../models/Record.js";
import Category from "../models/Category.js";
import { ICategory } from "../models/Category.js";

export const createRecord = async (req: Request, res: Response) => {
  const { category } = req.body;

  try {
    if (!category) {
      const defaultCategoryExists = await Category.findOne({ name: "default" });

      if (!defaultCategoryExists) {
        console.log("asd");
        const defaultCategory = new Category({ name: "default" });

        await defaultCategory.save();
        const record = { category: defaultCategory._id, ...req.body };
        const newRecord = new Record({
          ...record,
        });
        await newRecord.save();
        res.status(200).json({ message: "new Record is created" });
        return;
      }
      const record = { category: defaultCategoryExists._id, ...req.body };
      const newRecord = new Record({
        ...record,
      });

      await newRecord.save();
      res.status(200).json({ message: "new Record is created" });
      return;
    }

    const newRecord = new Record({
      ...req.body,
    });
    await newRecord.save();
    res.status(200).json({ message: "new Record is created" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

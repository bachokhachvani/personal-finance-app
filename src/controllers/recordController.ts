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
      console.log("sd", newRecord);
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
    });

    await newRecord.save();
    res.status(200).json({ message: "new Record is created" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

import { ICategory } from "../models/Category.js";
import { Request, Response } from "express";
import Category from "../models/Category.js";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await Category.findOne({ name });

  if (category) {
    return res.json({ message: "category name already exists!" });
  }

  const newCategory: ICategory = new Category({
    name: name,
  });

  await newCategory.save();
  res.json({ message: `new Category:${name} has been added!` });
};

export const editCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categoryId = req.query.id;

  try {
    const category: ICategory | null = await Category.findById(categoryId);

    if (!category) {
      res.status(400).json({ message: `category with this ID doesn't exists` });
      return;
    }

    if (name) {
      category.name = name;
    }
    const updatedCategory: ICategory = await category.save();
    res.status(200).json({ category: updatedCategory });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

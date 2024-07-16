import Category from "../models/category";
import { Response, NextFunction, Request } from "express";

const createCategory = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;

    const categoryExists = await Category.findOne({ title });

    if (categoryExists) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const newCategory = new Category({ title, description });

    await newCategory.save();
    res.status(201).json({ message: "Category created sucessfully!" });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req: any, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    
  }
};

export default { createCategory };

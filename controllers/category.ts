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
    const { q, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (q) {
      const search = new RegExp(q, 'i');
      query = { $or: [{ title: search }, { description: search }] };
    }

    const total = await Category.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);
    const categories = await Category.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedAt: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Get categories successful',
      data: { categories, total, pages, page: pageNumber, size: sizeNumber }
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

  

    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({data: category, message: 'Category received succesfully!S' });
  } catch (error) {
    next(error);
  }
};

const deleteCategory  = async (req: Request, res: Response, next: NextFunction) => {
try{
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Category ID is required" });
  }

  const category = await Category.findOneAndDelete({ _id: id });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({data: category, message: 'Category deleted' });


}catch(error){
next(error)
}
}

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ data: category, message: 'Category updated successfully!' });
  } catch (error) {
    next(error);
  }
};

export default { createCategory, getCategories, getCategory, deleteCategory, updateCategory };

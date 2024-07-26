import mongoose from "mongoose";
import Content from "../models/content";
import Course from "../models/course";
import { Request, NextFunction, Response } from "express";
import {fileController }from './'


const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contentType, order, title, description, course, content } = req.body;

    const contentExist = await Content.findOne({ title });

    if (contentExist) {
      res.status(400).json({ message: "Content already exists" });
      return;
    }

    const courseExist = await Course.findById(course);
    if (!courseExist) {
      res.status(400).json({ message: "Course does not exist" });
      return;
    }

    const newContent = new Content({
      contentType,
      order,
      title,
      description,
      course,
      content
    });

    await newContent.save();

    await Course.findByIdAndUpdate(course, {
      $push: { content: newContent._id },
    });

    res.status(201).json({ message: "Content created successfully" });
  } catch (error) {
    next(error);
  }
};


const updateContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contentType, order, title, description, course, content } =
      req.body;

    const { id } = req.params;

    const updatedContent = {
      contentType,
      order,
      title,
      description,
      course,
      content,
    };

    const options = { new: true };

    const editedContent = await Content.findOneAndUpdate(
      { _id: id },
      updatedContent,
      options
    );

    if (!editedContent) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res
      .status(200)
      .json({ data: editedContent, message: "Content updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const getContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const content = await Content.findOne({ _id: id }).populate("course");

    if (!content) {
      res.status(404).json({ message: "Content not found" });
    }

    res
      .status(200)
      .json({ data: content, message: "Content received successfully!" });
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const content = await Content.findOneAndDelete({ _id: id });

  if (!content) {
    res.status(404).json({ message: "Content not found" });
  }

  res
    .status(200)
    .json({ data: content, message: "Content deleted successfully!" });
};
export default { createContent, updateContent, getContent, deleteContent };

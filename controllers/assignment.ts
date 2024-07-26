import { Request, Response, NextFunction } from "express";
import Assignment from "../models/assignment";
import Content from "../models/content";
import Course from "../models/course";

const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order, title, description, course, dueDate, maxScore } = req.body;

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

    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      course,
      maxScore,
    });

    await newAssignment.save();

    const newContent = new Content({
      contentType: "assignment",
      order,
      title,
      description,
      course,
      assignment: newAssignment._id,
    });

    await newContent.save();

    await Course.findByIdAndUpdate(course, {
      $push: { content: newContent._id },
    });

    res.status(201).json({ message: "Assignment created successfully" });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, maxScore, order } = req.body;

    const content = await Content.findOne({ "content.assignment": id });
    if (!content) {
      res.status(404).json({ message: "Content related to the assignment not found" });
      return;
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      { _id: id },
      { title, description, dueDate, maxScore },
      { new: true }
    );

    if (!updatedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    const updatedContent = await Content.findOneAndUpdate(
      { _id: content._id },
      { 
        title, 
        description, 
        order,
        "content.assignment.instructions": description,
        "content.assignment.dueDate": dueDate,
        "content.assignment.maxScore": maxScore,
      },
      { new: true }
    );

    if (!updatedContent) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res.status(200).json({ message: "Assignment and content updated successfully", updatedAssignment, updatedContent });
  } catch (error) {
    next(error);
  }
};

const getAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById({ _id: id });

    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const content = await Content.findOne({ "content.assignment._id": id });
    if (!content) {
      res.status(404).json({ message: "Content related to the assignment not found" });
      return;
    }

    const deletedAssignment = await Assignment.findByIdAndDelete({_id: id});

    if (!deletedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    const deletedContent = await Content.findOneAndDelete(
      { _id: content._id },
    );

    if (!deletedContent) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res.status(200).json({ message: "Assignment and content deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { createAssignment, updateAssignment, getAssignment, deleteAssignment };

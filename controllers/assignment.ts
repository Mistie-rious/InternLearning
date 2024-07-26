import { Request, Response, NextFunction } from "express";
import Assignment from "../models/assignment";
import Content from "../models/content";
import Course from "../models/course";
const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, course, dueDate, maxScore } = req.body;
  
      // Check if course exists
      const courseExist = await Course.findById(course);
      if (!courseExist) {
        res.status(400).json({ message: "Course does not exist" });
        return;
      }
  
      // Create and save the new assignment
      const newAssignment = new Assignment({
        title,
        description,
        dueDate,
        course,
        maxScore,
      });
      await newAssignment.save();
  
      // Find or create content for the course
      let courseContent = await Content.findOne({ course });
  
      if (!courseContent) {
        courseContent = new Content({ course });
        await courseContent.save();
      }
  
      // Add the assignment to the content's assignments array
      if (!courseContent.assignments.includes(newAssignment._id)) {
        courseContent.assignments.push(newAssignment._id);
        await courseContent.save();
      }
  
      // Update the course to ensure it has the content reference

  
      res.status(201).json({ message: "Assignment created successfully", newAssignment });
    } catch (error) {
      next(error);
    }
  };
  
  
  const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, description, dueDate, maxScore } = req.body;
  
      // Update the assignment
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { title, description, dueDate, maxScore },
        { new: true }
      );
  
      if (!updatedAssignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
  

      const content = await Content.findOne({ course: updatedAssignment.course });
      if (content) {

        await content.save();
      }
  
      res.status(200).json({ message: "Assignment updated successfully", updatedAssignment });
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
  
      // Find and delete the assignment
      const deletedAssignment = await Assignment.findByIdAndDelete({_id: id});
      if (!deletedAssignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
  
      // Update content to remove the deleted assignment reference
      const content = await Content.findOne({ course: deletedAssignment.course });
      if (content) {
        content.assignments = content.assignments.filter(assignmentId => !assignmentId.equals(id));
        await content.save();
      }
  
      res.status(200).json({ message: "Assignment and content reference deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  export default { createAssignment, updateAssignment, getAssignment, deleteAssignment };
  

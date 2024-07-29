import { Request, Response, NextFunction } from "express";
import mongoose, { ObjectId } from "mongoose";
import Progress from "../models/progress";
const addProgress = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { completedContents, quizResults, assignmentResults }: { completedContents: string[], quizResults: any[], assignmentResults: any[] } = req.body;
    const { id }: { id: string } = req.params; 
    const studentId: ObjectId = req.user._id;

    const progress = await Progress.findOne({ student: studentId, course: id });

    if (progress) {
      if (quizResults && Array.isArray(quizResults)) {
        quizResults.forEach((newResult: any) => {
          const index = progress.quizResults.findIndex(
            (result: any) => result.quizId.toString() === newResult.quizId
          );
          if (index !== -1) {
            progress.quizResults[index] = newResult;
          } else {
            progress.quizResults.push(newResult);
          }
        });
      }

      if (assignmentResults && Array.isArray(assignmentResults)) {
        assignmentResults.forEach((newResult: any) => {
          const index = progress.assignmentResults.findIndex(
            (result: any) => result.assignmentId.toString() === newResult.assignmentId
          );
          if (index !== -1) {
            progress.assignmentResults[index] = newResult;
          } else {
            progress.assignmentResults.push(newResult);
          }
        });
      }

      const completedContentsSet = new Set(
        progress.completedContents.map((content: any) => content.toString())
      );
      completedContents.forEach((content: string) => completedContentsSet.add(content));
      progress.completedContents = Array.from(completedContentsSet).map(
        (content: string) => new mongoose.Types.ObjectId(content)
      );

      const updatedProgress = await progress.save();
      res.status(200).json({ message: "Progress updated successfully", updatedProgress });
    } else {
      const newProgress = new Progress({
        student: studentId,
        course: id,
        completedContents: [...new Set(completedContents)].map(content =>
          new mongoose.Types.ObjectId(content)
        ),
        quizResults: quizResults || [],
        assignmentResults: assignmentResults || []
      });

      const savedProgress = await newProgress.save();
      res.status(201).json({ message: "Progress created successfully", savedProgress });
    }
  } catch (error) {
    next(error);
  }
};

  const getProgress = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // course ID
      const studentId: ObjectId = req.user._id;
  
      const progress = await Progress.findOne({ student: studentId, course: id });
  
      res
        .status(200)
        .json({ data: progress, message: "Progress retrieved successfully!" });
    } catch (error) {
      next(error);
    }
  };

  const getAllProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, size = 10, student, course } = req.query;
      const query: any = {};
  
      if (student) query.student = student;
      if (course) query.course = course;
  
      const progressList = await Progress.find(query)
        .skip((Number(page) - 1) * Number(size))
        .limit(Number(size))
        .exec();
  
      const total = await Progress.countDocuments(query);
  
      res.status(200).json({
        data: progressList,
        total,
        page: Number(page),
        size: Number(size),
        message: "Progress records retrieved successfully!"
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteProgress = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id }: { id: string } = req.params; 
      const studentId: ObjectId = req.user._id;
  
      const progress = await Progress.findOneAndDelete({ student: studentId, course: id });
  
      if (!progress) {
        return res.status(404).json({ message: "Progress record not found" });
      }
  
      res.status(200).json({ message: "Progress deleted successfully" });
    } catch (error) {
      next(error);
    }
  };



export default { addProgress, getProgress, getAllProgress, deleteProgress };

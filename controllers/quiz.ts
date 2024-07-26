import { Request, Response, NextFunction } from "express";
import Quiz from "../models/quiz";
import Content from "../models/content";
import Course from "../models/course";


const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order, title, description, course, questions, duration } = req.body;

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

    const newQuiz = new Quiz({
      questions,
      duration
    });

    await newQuiz.save();

    const newContent = new Content({
      contentType: "quiz",
      order,
      title,
      description,
      course,
      quiz: newQuiz._id,
    });

    await newContent.save();

    await Course.findByIdAndUpdate(course, {
      $push: { content: newContent._id },
    });

    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { questions, duration, title, description, order } = req.body;

      const content = await Content.findOne({ "quiz": id });
      if (!content) {
        res.status(404).json({ message: "Content related to the quiz not found" });
        return;
      }
  
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        { _id: id },
        { questions, duration },
        { new: true }
      );
  
      if (!updatedQuiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
  
      const updatedContent = await Content.findOneAndUpdate(
        { _id: content._id },
        { title, description, order },
        { new: true }
      );
  
      if (!updatedContent) {
        res.status(404).json({ message: "Content not found" });
        return;
      }
  
      res.status(200).json({ message: "Quiz and content updated successfully", updatedQuiz, updatedContent });
    } catch (error) {
      next(error);
    }
  };
  

const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id} = req.params;
  
      const quiz = await Quiz.findById({_id: id}).populate("questions");
  
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
  
      res.status(200).json(quiz);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      
      const content = await Content.findOne({ "quiz": id });
      if (!content) {
        res.status(404).json({ message: "Content related to the quiz not found" });
        return;
      }
  
      const deletedQuiz = await Quiz.findByIdAndDelete(id);
  
      if (!deletedQuiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
      const deletedContent = await Content.findOneAndDelete(
        { _id: content._id },
      );
  
  
      if (!deletedContent) {
        res.status(404).json({ message: "Content not found" });
        return;
      }
  
      res.status(200).json({ message: "Quiz and content deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  
  export default { createQuiz, updateQuiz, getQuiz, deleteQuiz };
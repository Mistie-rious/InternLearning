import { Request, Response, NextFunction } from "express";
import Quiz from "../models/quiz";
import Content from "../models/content";
import Course from "../models/course";

const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, title, questions, duration } = req.body;

   
    const content = await Content.findOne({ course: courseId });
    if (!content) {
      res.status(404).json({ message: "Content not found for the given course" });
      return;
    }

    const newQuiz = new Quiz({
      course: courseId,
      title,
      questions,
      duration
    });
    const savedQuiz = await newQuiz.save();

  
    content.quizzes.push(savedQuiz._id);

 
    const updatedContent = await content.save();

    res.status(201).json({
      message: "Quiz added to content successfully",
      content: updatedContent,
      quiz: savedQuiz
    });
  } catch (error) {
    next(error);
  }
};
const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { questions, duration, title, description, order } = req.body;

    // Find the content that contains the quiz
    const content = await Content.findOne({ quizzes: id });
    if (!content) {
      res.status(404).json({ message: "Content related to the quiz not found" });
      return;
    }

    // Update the quiz
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, questions, duration },
      { new: true }
    );

    if (!updatedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    // Update the content
    const updatedContent = await Content.findByIdAndUpdate(
      content._id,
      { title, description },
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

  const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, size, page, courseId } = req.query;
      let query: any = {};
  
      const sizeNumber = parseInt(size as string) || 10;
      const pageNumber = parseInt(page as string) || 1;
  
      if (q) {
        const search = new RegExp(q as string, 'i');
        query = { $or: [{ title: search }, { description: search }] };
      }
  
      if (courseId) {
        query.courseId = courseId;
      }
  
      const total = await Quiz.countDocuments(query);
      const pages = Math.ceil(total / sizeNumber);
      const quizzes = await Quiz.find(query)
        .skip((pageNumber - 1) * sizeNumber)
        .limit(sizeNumber)
        .sort({ updatedAt: -1 })
      
  
      res.status(200).json({
        code: 200,
        status: true,
        message: 'Get quizzes successful',
        data: { quizzes, total, pages, page: pageNumber, size: sizeNumber }
      });
    } catch (error) {
      next(error);
    }
  };
  const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
  
      
      const content = await Content.findOne({ quizzes: id });
      if (!content) {
        res.status(404).json({ message: "Content related to the quiz not found" });
        return;
      }
  
     
      const deletedQuiz = await Quiz.findByIdAndDelete({_id: id});
      if (!deletedQuiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
  
    
      content.quizzes = content.quizzes.filter(quizId => quizId.toString() !== id);
      await content.save();
  
      res.status(200).json({ message: "Quiz and content reference deleted successfully" });
    } catch (error) {
      next(error);
    }
  };


  
  export default { createQuiz, updateQuiz, getQuiz, deleteQuiz, getQuizzes };
import { Request, Response, NextFunction } from "express";
import Chapter from "../models/chapter";
import Content from "../models/content";


const createChapter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, sections, courseId } = req.body;
  
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  

      const existingChapter = await Chapter.findOne({ title });
      if (existingChapter) {
        return res.status(409).json({ message: "Chapter with this title already exists" });
      }
  
      const newChapter = new Chapter({ title, sections, courseId });
      await newChapter.save();
  
      const content = await Content.findOne({ course: courseId });
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      content.chapters.push(newChapter._id);
      await content.save();
  
      res.status(201).json({ message: "Chapter created successfully", chapter: newChapter });
    } catch (error) {
      next(error);
    }
  };

  const getChapters = async (req: Request, res: Response, next: NextFunction) => {
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
  
      const total = await Chapter.countDocuments(query);
      const pages = Math.ceil(total / sizeNumber);
      const chapters = await Chapter.find(query)
        .skip((pageNumber - 1) * sizeNumber)
        .limit(sizeNumber)
        .sort({ updatedAt: -1 })
        .populate('courseId');
  
      res.status(200).json({
        code: 200,
        status: true,
        message: 'Get chapters successful',
        data: { chapters, total, pages, page: pageNumber, size: sizeNumber }
      });
    } catch (error) {
      next(error);
    }
  };

const getChapterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, sections } = req.body;

    const chapter = await Chapter.findByIdAndUpdate(id, { title, sections }, { new: true });
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json({ message: "Chapter updated successfully", chapter });
  } catch (error) {
    next(error);
  }
};

 const deleteChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findByIdAndDelete(id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

 
    await Content.updateMany({}, { $pull: { chapters: id } });

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {createChapter, getChapters, getChapterById, updateChapter, deleteChapter}
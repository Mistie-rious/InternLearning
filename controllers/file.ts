import { NextFunction, Response, Request } from "express";
const path = require("path");
import { validateExtension, validateImageExtension } from "../validators/file";
import { uploadNewFile, signedUrl, deleteFileFromS3 } from "../utils/awsS3";
const multer = require("multer");
import { parseExcelFile } from "../utils/excelService";
import Video from "../models/video";
import Quiz from "../models/quiz";
import Course from "../models/course";
import Content from "../models/content";

const uploadVideo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { file } = req;

    const { courseId } = req.body;

    const content = await Content.findOne({ course: courseId });
    if (!content) {
      res
        .status(404)
        .json({ message: "Content not found for the given course" });
      return;
    }

    if (!file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const ext = path.extname(file.originalname);
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      res.status(400);
      throw new Error("Invalid file extension");
    }

    const Key = await uploadNewFile(file, ext);
    const Url = await signedUrl(Key);
    if (Key) {
      const newVideo = new Video({
        key: Key,
        size: file.size,
        mimetype: file.mimetype,
        createdBy: req.user._id,
        url: Url,
      });

      await newVideo.save();

      content.videos.push(newVideo._id);
      const updatedContent = await content.save();

      res.status(201).json({
        message: "Video added to content successfully",
        content: updatedContent,
        video: newVideo,
      });
    }
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { file } = req;
    const { courseId } = req.body;

    const course = await Course.findById({_id: courseId});
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    if (!file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const ext = path.extname(file.originalname);
    const isValidExt = validateImageExtension(ext);

    if (!isValidExt) {
      res.status(400);
      throw new Error("Invalid file extension");
    }

    const Key = await uploadNewFile(file, ext);
    const Url = await signedUrl(Key);
    if (Key && Url) {
      course.imageUrl = Url;
      const updatedCourse = await course.save();

      res.status(201).json({
        message: "Image uploaded and URL saved to course successfully",
        course: updatedCourse,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getSignedUrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { key } = req.query;
    const url = await signedUrl(key);

    res.status(201).json({
      code: 200,
      status: true,
      message: "Get signed URL",
      data: { url },
    });
  } catch (error) {
    next(error);
  }
};
const deleteVideo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { key } = req.body;
    const { id } = req.params;

    const video = await Video.findOne({ _id: id });
    if (!video) {
      res.status(404).json({ message: "Video not found" });
      return;
    }

    await deleteFileFromS3(key);

    await Video.findOneAndDelete({ key });

    const content = await Content.findOneAndUpdate(
      { videos: video._id },
      { $pull: { videos: video._id } },
      { new: true }
    );

    if (!content) {
      res
        .status(404)
        .json({ message: "Content related to the video not found" });
      return;
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "File deleted successfully!",
      content,
    });
  } catch (error) {
    next(error);
  }
};

const uploadSpreadsheet = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file } = req;
    const { courseId, title, duration } = req.body;

    const content = await Content.findOne({ course: courseId });
    if (!content) {
      res
        .status(404)
        .json({ message: "Content not found for the given course" });
      return;
    }

    const questions = await parseExcelFile(file.buffer);

    const newQuiz = new Quiz({
      course: courseId,
      title,
      questions,
      duration,
    });
    const savedQuiz = await newQuiz.save();

    content.quizzes.push(savedQuiz._id);
    const updatedContent = await content.save();

    res.status(201).json({
      message: "Quiz added to content successfully",
      content: updatedContent,
      quiz: savedQuiz,
    });
  } catch (error) {
    next(error);
  }
};
const updateSpreadsheet = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const { title, description, order, duration } = req.body;

    const content = await Content.findOne({ quizzes: id });
    if (!content) {
      res
        .status(404)
        .json({ message: "Content related to the quiz not found" });
      return;
    }

    const questions = await parseExcelFile(file.buffer);

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, questions, duration },
      { new: true }
    );

    if (!updatedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    const updatedContent = await Content.findByIdAndUpdate(
      content._id,
      { title, description },
      { new: true }
    );

    if (!updatedContent) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res.status(200).json({
      message: "Quiz and content updated successfully",
      updatedQuiz,
      updatedContent,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  uploadVideo,
  uploadImage,
  getSignedUrl,
  deleteVideo,
  uploadSpreadsheet,
  updateSpreadsheet,
};

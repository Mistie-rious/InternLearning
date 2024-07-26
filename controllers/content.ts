// import mongoose from "mongoose";
// import Content from "../models/content";
// import Course from "../models/course";
// import { Request, NextFunction, Response } from "express";


// const createContent = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { course, content } = req.body;


//     const courseExist = await Course.findById(course);
//     if (!courseExist) {
//       res.status(400).json({ message: "Course does not exist" });
//       return;
//     }

//     let courseContent = await Content.findOne({ course });

//     const updateFields = {
//       assignments: content.assignment ? [content.assignment] : [],
//       quizzes: content.quiz ? [content.quiz] : [],
//       chapters: content.chapter ? [content.chapter] : [],
//       videos: content.video ? [content.video] : [],
//     };

//     if (courseContent) {

//       Object.keys(updateFields).forEach(field => {
//         if (updateFields[field].length > 0) {
//           courseContent[field].push(...updateFields[field]);
//         }
//       });

//       await courseContent.save();
//       res.status(200).json({ message: "Content updated successfully", courseContent });
//     } else {
     
//       const newContent = new Content({
//         course,
//         ...updateFields,
//       });

//       await newContent.save();
//       await Course.findByIdAndUpdate(course, { $push: { content: newContent._id } });

//       res.status(201).json({ message: "Content created successfully", newContent });
//     }
//   } catch (error) {
//     next(error);
//   }
// };


// const getContent = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;

//     const content = await Content.findOne({ course: id })
//       .populate("assignments")
//       .populate("quizzes")
//       .populate("course");

//     if (!content) {
//       res.status(404).json({ message: "Content not found" });
//       return;
//     }

//     res.status(200).json({ data: content, message: "Content received successfully!" });
//   } catch (error) {
//     next(error);
//   }
// };


// const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;

//     const content = await Content.findOneAndDelete({ course: id });

//     if (!content) {
//       res.status(404).json({ message: "Content not found" });
//       return;
//     }

//     res.status(200).json({ data: content, message: "Content deleted successfully!" });
//   } catch (error) {
//     next(error);
//   }
// };



// export default { createContent, getContent, deleteContent };

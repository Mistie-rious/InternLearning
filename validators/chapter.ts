import { body, param } from "express-validator";

const createChapterValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("sections").isArray().withMessage("Sections should be an array of objects"),
  body("sections.*.title").notEmpty().withMessage("Section title is required"),
  body("sections.*.content").notEmpty().withMessage("Section content is required"),
  body("courseId").notEmpty().withMessage("Course ID is required").isMongoId().withMessage("Invalid Course ID"),
];

const chapterIdValidator = [
  param("id").isMongoId().withMessage("Invalid chapter ID"),
];

const updateChapterValidator = [
  param("id").isMongoId().withMessage("Invalid chapter ID"),
  body("title").optional().notEmpty().withMessage("Title is required if provided"),
  body("sections").optional().isArray().withMessage("Sections should be an array of objects if provided"),
  body("sections.*.title").optional().notEmpty().withMessage("Section title is required if provided"),
  body("sections.*.content").optional().notEmpty().withMessage("Section content is required if provided"),
  body("courseId").optional().isMongoId().withMessage("Invalid Course ID if provided"),
];

export { createChapterValidator, chapterIdValidator, updateChapterValidator };
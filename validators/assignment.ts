import { body, param } from "express-validator";

const createAssignmentValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("course").isMongoId().withMessage("Invalid course ID"),
    body("dueDate").isISO8601().withMessage("Invalid due date"),
    body("maxScore").isInt({ gt: 0 }).withMessage("Max score must be a positive integer"),
  ];
  
  const updateAssignmentValidator = [
    param("id").isMongoId().withMessage("Invalid assignment ID"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
    body("dueDate").optional().isISO8601().withMessage("Invalid due date"),
    body("maxScore").optional().isInt({ gt: 0 }).withMessage("Max score must be a positive integer"),
  ];
  
const getAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment ID"),
];

const deleteAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment ID"),
];

const submitAssignmentValidator = [
  body("assignment").isMongoId().withMessage("Invalid assignment ID"),
  body("content").notEmpty().withMessage("Content cannot be empty"),
];


const gradeSubmissionValidator = [
  body("submission").isMongoId().withMessage("Invalid submission ID"),
  body("score").isInt({ min: 0 }).withMessage("Score must be a non-negative integer"),
  body("feedback").optional().notEmpty().withMessage("Feedback cannot be empty"),
];

export  { createAssignmentValidator, updateAssignmentValidator, getAssignmentValidator, deleteAssignmentValidator , submitAssignmentValidator,gradeSubmissionValidator};
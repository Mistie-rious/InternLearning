import { body, param } from "express-validator";

const createAssignmentValidator = [
    body("order").isInt({ gt: 0 }).withMessage("Order must be a positive integer"),
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
    body("order").optional().isInt({ gt: 0 }).withMessage("Order must be a positive integer"),
    body("maxScore").optional().isInt({ gt: 0 }).withMessage("Max score must be a positive integer"),
  ];
  
const getAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment ID"),
];

const deleteAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment ID"),
];


export  { createAssignmentValidator, updateAssignmentValidator, getAssignmentValidator, deleteAssignmentValidator };
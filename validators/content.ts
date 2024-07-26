import { check, body } from 'express-validator';
import mongoose from 'mongoose';

const createContentValidator = [
  check('contentType')
    .isIn(['assignment', 'quiz', 'chapter', 'video'])
    .withMessage('Invalid content type'),
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('course')
    .isMongoId()
    .withMessage('Invalid course ID'),
  check('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  body('content.assignment.instructions')
    .optional()
    .isString()
    .withMessage('Instructions must be a string'),
  body('content.assignment.dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('content.assignment.maximumMarks')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum marks must be a non-negative integer'),
  body('content.quiz')
    .optional()
    .isMongoId()
    .withMessage('Quiz ID must be a valid MongoDB ObjectId'),
  body('content.chapter.sections')
    .optional()
    .isArray()
    .withMessage('Sections must be an array')
    .custom((value) => value.every((section: any) => 
      typeof section.title === 'string' &&
      typeof section.content === 'string'
    ))
    .withMessage('Each section must have a valid title and content'),
  body('content.video')
    .optional()
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage('Video ID must be a valid MongoDB ObjectId')
];

const updateContentValidator = [
  check('id').isMongoId().withMessage('Invalid content ID.'),
  check('contentType')
    .optional()
    .isIn(['assignment', 'quiz', 'chapter', 'video'])
    .withMessage('Invalid content type'),
  check('title')
    .optional()
    .notEmpty()
    .withMessage('Title is required'),
  check('course')
    .optional()
    .isMongoId()
    .withMessage('Invalid course ID'),
  check('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  body('content.assignment.instructions')
    .optional()
    .isString()
    .withMessage('Instructions must be a string'),
  body('content.assignment.dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('content.assignment.maximumMarks')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum marks must be a non-negative integer'),
  body('content.quiz')
    .optional()
    .isMongoId()
    .withMessage('Quiz ID must be a valid MongoDB ObjectId'),
  body('content.chapter.sections')
    .optional()
    .isArray()
    .withMessage('Sections must be an array')
    .custom((value) => value.every((section: any) => 
      typeof section.title === 'string' &&
      typeof section.content === 'string'
    ))
    .withMessage('Each section must have a valid title and content'),
  body('content.video')
    .optional()
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage('Video ID must be a valid MongoDB ObjectId')
];

const getContentValidator = [
  check('id').isMongoId().withMessage('Invalid content ID.')
];

const deleteContentValidator = [
  check('id').isMongoId().withMessage('Invalid content ID.')
];

export { createContentValidator, updateContentValidator, getContentValidator, deleteContentValidator };

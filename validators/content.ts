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
  body('content.quiz.questions')
    .optional()
    .isArray()
    .withMessage('Questions must be an array')
    .custom((value) => value.every((question: any) => 
      typeof question.text === 'string' &&
      Array.isArray(question.options) &&
      question.options.every((option: any) => typeof option === 'string') &&
      Number.isInteger(question.correctAnswer) &&
      question.correctAnswer >= 0 && question.correctAnswer < question.options.length
    ))
    .withMessage('Each question must have valid text, options, and correctAnswer'),
  body('content.quiz.duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer'),
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

export  {createContentValidator};
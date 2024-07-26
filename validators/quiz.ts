import { check, body } from 'express-validator';
import mongoose from 'mongoose';

const createQuizValidator = [
  check('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('course')
    .isMongoId()
    .withMessage('Invalid course ID'),
  body('questions')
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
  body('duration')
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer')
];

const updateQuizValidator = [
  check('quizId')
    .isMongoId()
    .withMessage('Invalid quiz ID'),
  body('questions')
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
  body('duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer')
];

const getQuizValidator = [
  check('quizId').isMongoId().withMessage('Invalid quiz ID.')
];

const deleteQuizValidator = [
  check('quizId').isMongoId().withMessage('Invalid quiz ID.')
];

export { createQuizValidator, updateQuizValidator, getQuizValidator, deleteQuizValidator };

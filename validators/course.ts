import { check } from "express-validator";


const createCourseValidator = [
  check('title')
    .notEmpty().withMessage('Title is a required field')
    .isString().withMessage('Title should be a type of text'),
  
  check('description')
    .optional()
    .isString().withMessage('Description should be a type of text'),
  
  check('category')
    .notEmpty().withMessage('Category is a required field')
    .isMongoId().withMessage('Category should be a valid Mongo ID'),
  
  check('author')
    .notEmpty().withMessage('Author is a required field')
    .isMongoId().withMessage('Author should be a valid Mongo ID'),
  
  check('publishedDate')
    .optional()
    .isISO8601().withMessage('Published Date should be a valid date'),
  
  check('content')
    .optional()
    .isArray().withMessage('Content should be an array')
    .custom((value) => value.every((id: string) => typeof id === 'string')).withMessage('Each content ID should be a type of text'),
  
  check('imageUrl')
    .optional()
    .isString().withMessage('Image URL should be a type of text'),
  
  check('duration')
    .optional()
    .isNumeric().withMessage('Duration should be a type of number'),
  
  check('level')
    .notEmpty().withMessage('Level is a required field')
    .isIn(['beginner', 'intermediate', 'advanced']).withMessage('Level must be one of "beginner", "intermediate", "advanced"'),
  
  check('students')
    .optional()
    .isArray().withMessage('Students should be an array')
    .custom((value) => value.every((id: string) => typeof id === 'string')).withMessage('Each student ID should be a type of text'),
  
  check('reviews')
    .optional()
    .isArray().withMessage('Reviews should be an array')
    .custom((value) => value.every((review: any) => 
      typeof review.user === 'string' &&
      typeof review.rating === 'number' &&
      review.rating >= 1 && review.rating <= 5 &&
      typeof review.comment === 'string'
    )).withMessage('Each review should contain a valid user ID, rating (1-5), and comment'),
];

const getCourseValidator = [
  check('id')
    .notEmpty().withMessage('ID is a required field')
    .isMongoId().withMessage('ID should be a valid Mongo ID'),
]

const deleteCourseValidator = [
  check('id')
  .notEmpty().withMessage('ID is a required field')
  .isMongoId().withMessage('ID should be a valid Mongo ID'),
]

const updateCourseValidator = [
  check('id')
  .notEmpty().withMessage('ID is a required field')
  .isMongoId().withMessage('ID should be a valid Mongo ID'),
]


export { createCourseValidator, getCourseValidator, deleteCourseValidator, updateCourseValidator };
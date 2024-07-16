import { check } from "express-validator";

const createCategoryValidator = [
    check('title')
    .notEmpty()
    .withMessage('Title is required.'),
    check('description')
    .notEmpty()
    .withMessage('Description is required')
]

export {createCategoryValidator}
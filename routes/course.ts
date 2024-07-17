import express from "express";
const router = express.Router()
import { courseController } from "../controllers";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import validate from "../validators/validate";
import { createCourseValidator, getCourseValidator } from "../validators/course";
router.post('/create', isAuth, isAdmin, createCourseValidator, validate, courseController.createCourse);

router.get('/', isAuth, courseController.getCourses);

router.get('/:id', isAuth, getCourseValidator, validate, courseController.getCourse);
export default router;
import express from "express";
const router = express.Router()
import { courseController } from "../controllers";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import validate from "../validators/validate";
import { createCourseValidator, getCourseValidator, deleteCourseValidator, updateCourseValidator} from "../validators/course";
router.post('/create', isAuth, isAdmin, createCourseValidator, validate, courseController.createCourse);

router.post('/:id/enroll', isAuth, validate, courseController.enrollCourse) 
router.get('/', isAuth, courseController.getCourses);

router.get('/:id', isAuth, getCourseValidator, validate, courseController.getCourse);

router.put('/update/:id', isAuth, isAdmin, updateCourseValidator, validate, courseController.updateCourse);

router.delete('/delete/:id', isAuth, isAdmin, deleteCourseValidator, validate, courseController.deleteCourse);
export default router;
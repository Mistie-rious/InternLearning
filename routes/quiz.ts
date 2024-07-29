import express from "express"
const router = express.Router()
import { quizController } from "../controllers";
import isAuth from "../middlewares/isAuth";
import validate from "../validators/validate";
import isAdmin from "../middlewares/isAdmin";

import { createQuizValidator, getQuizValidator, updateQuizValidator, deleteQuizValidator } from "../validators/quiz";

router.post('/create', isAuth, isAdmin,createQuizValidator, validate, quizController.createQuiz);

router.get('/:id', isAuth,  validate, getQuizValidator,  quizController.getQuiz);

router.delete('/delete/:id', isAuth, isAdmin,  validate, quizController.deleteQuiz);

router.get('/', isAuth, validate, quizController.getQuizzes)

router.put('/update/:id', isAuth, isAdmin, validate, quizController.updateQuiz);

export default router;
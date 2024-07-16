import express  from "express";
const router = express.Router();
import validate from "../validators/validate";
import { categoryController } from "../controllers";
import { createCategoryValidator } from "../validators/category";
import isAuth from "../middlewares/isAuth";

router.post('/create', isAuth, createCategoryValidator,  validate, categoryController.createCategory)

export default router;
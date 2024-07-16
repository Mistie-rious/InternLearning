import express  from "express";
const router = express.Router();
import validate from "../validators/validate";
import { categoryController } from "../controllers";
import { createCategoryValidator } from "../validators/category";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

router.post('/create', isAuth, isAdmin, createCategoryValidator,  validate, categoryController.createCategory)

router.get('/', isAuth, categoryController.getCategories)

router.get('/:id', isAuth, categoryController.getCategory )

router.delete('/delete/:id', isAuth, categoryController.deleteCategory)

router.put('/update/:id', isAuth, categoryController.updateCategory)

export default router;
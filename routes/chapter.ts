import express  from "express";
const router = express.Router();
import validate from "../validators/validate";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import { chapterController } from "../controllers";
import { createChapterValidator, chapterIdValidator, updateChapterValidator } from "../validators/chapter";

router.post('/create', isAuth, isAdmin, createChapterValidator, validate, chapterController.createChapter)
router.get('/', isAuth, validate, chapterController.getChapters)
router.get('/:id', isAuth, validate,chapterIdValidator,  chapterController.getChapterById)
router.put('/update/:id',isAuth, isAdmin, validate, chapterController.updateChapter )
router.delete('/delete/:id', isAuth, isAdmin, validate, updateChapterValidator, chapterController.deleteChapter)


export default router;
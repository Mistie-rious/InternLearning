import express from "express";
const router = express.Router();
import { contentController } from "../controllers";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import {createContentValidator, getContentValidator, deleteContentValidator }from "../validators/content";
import validate from "../validators/validate";

import upload from "../middlewares/upload";



router.post('/create', isAuth, isAdmin, upload.single('Video'), validate, contentController.createContent);

router.get('/:id', isAuth, getContentValidator, validate,  contentController.getContent);

router.delete('/delete/:id', isAuth, isAdmin, deleteContentValidator, validate, contentController.deleteContent);

router.put('/update/:id', isAuth, isAdmin, createContentValidator, validate, contentController.updateContent);

export default router;
import express from "express";
const router = express.Router();
import { contentController } from "../controllers";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import {createContentValidator }from "../validators/content";
import validate from "../validators/validate";

router.post('/create', isAuth, isAdmin, createContentValidator, validate, contentController.createContent);


export default router;
import express  from "express";
const router = express.Router();
import { fileController } from "../controllers";
import upload from "../middlewares/upload";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

router.post('/upload', isAuth, isAdmin, upload.single('Video'), fileController.uploadFile);


export default router;
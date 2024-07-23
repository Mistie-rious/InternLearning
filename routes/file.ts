import express  from "express";
const router = express.Router();
import { fileController } from "../controllers";
import upload from "../middlewares/upload";
import isAuth from "../middlewares/isAuth";

router.post('/upload', isAuth, upload.single('Video'), fileController.uploadSpreadsheet);
export default router;
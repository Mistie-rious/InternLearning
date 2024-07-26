import express  from "express";
const router = express.Router();
import { fileController } from "../controllers";
import upload from "../middlewares/upload";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

router.post('/upload-video', isAuth, isAdmin, upload.single('Video'), fileController.uploadFile);
router.post('/upload-excel', isAuth, isAdmin, upload.single('Xlsx'), fileController.uploadSpreadsheet);


export default router;
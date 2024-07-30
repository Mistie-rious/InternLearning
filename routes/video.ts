import express  from "express";
const router = express.Router();
import { fileController } from "../controllers";
import upload from "../middlewares/upload";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

router.post('/upload-video', isAuth, isAdmin, upload.single('Video'), fileController.uploadVideo);
router.delete('/delete-video/:id', isAuth, isAdmin, fileController.deleteVideo)
router.post('/upload-image', isAuth, isAdmin, upload.single('Image'), fileController.uploadImage)
router.post('/upload-excel', isAuth, isAdmin, upload.single('Xlsx'), fileController.uploadSpreadsheet);
router.put('/update-excel/:id', isAuth, isAdmin,  upload.single('Xlsx'), fileController.updateSpreadsheet)

export default router;
import express  from "express";
const router = express.Router();
import { videoController } from "../controllers";
import upload from "../middlewares/upload";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

router.post('/upload-video', isAuth, isAdmin, upload.single('Video'), videoController.uploadVideo);
router.delete('/delete-video/:id', isAuth, isAdmin, videoController.deleteVideo)
router.post('/upload-excel', isAuth, isAdmin, upload.single('Xlsx'), videoController.uploadSpreadsheet);
router.put('/update-excel/:id', isAuth, isAdmin,  upload.single('Xlsx'), videoController.updateSpreadsheet)

export default router;
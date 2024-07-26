import express from "express";
const router = express.Router();

import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import validate from "../validators/validate";
import { assignmentController } from "../controllers";

import { createAssignmentValidator, getAssignmentValidator, deleteAssignmentValidator, updateAssignmentValidator } from "../validators/assignment";

router.post('/create', isAuth, isAdmin, createAssignmentValidator, validate, assignmentController.createAssignment);
router.get('/:id', isAuth, getAssignmentValidator, validate, assignmentController.getAssignment);
router.put('/update/:id', isAuth, isAdmin, updateAssignmentValidator, validate, assignmentController.updateAssignment);
router.delete('/delete/:id', isAuth, isAdmin, deleteAssignmentValidator, validate, assignmentController.deleteAssignment);

export default router;
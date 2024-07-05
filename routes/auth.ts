import express  from "express";
const router = express.Router();
import {authController} from '../controllers'
import validate from "../validators/validate";
import { signupvalidator, signinvalidator, emailValidator } from "../validators/auth";

router.post('/signup', signupvalidator, validate, authController.signup)

router.post('/signin', signinvalidator, validate, authController.signin)

router.post('/verification-email', emailValidator, validate, authController.verifyCode)


export default router;
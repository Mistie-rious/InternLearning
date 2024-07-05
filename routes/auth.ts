import express  from "express";
const router = express.Router();
import {authController} from '../controllers'
import validate from "../validators/validate";
import { signupvalidator, signinvalidator, emailValidator, codeValidator } from "../validators/auth";

router.post('/signup', signupvalidator, validate, authController.signup)

router.post('/signin', signinvalidator, validate, authController.signin)

router.post('/verification-email', emailValidator, validate, authController.verifyCode)

router.post('/verify-user', codeValidator, validate, authController.verifyUser )

router.post('/forgot-password', emailValidator, validate, authController.forgotPasswordCode)




export default router;
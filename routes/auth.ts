import express  from "express";
const router = express.Router();
import {authController} from '../controllers'
import validate from "../validators/validate";
import isAuth from "../middlewares/isAuth";
import { signupvalidator, signinvalidator, emailValidator, codeValidator, recoverPasswordValidator, changePasswordValidator } from "../validators/auth";

router.post('/signup', signupvalidator, validate, authController.signup)

router.post('/signin', signinvalidator, validate, authController.signin)

router.get('/user', isAuth, validate, authController.getLoggedInUser);

router.post('/verification-email', emailValidator, validate, authController.verifyCode)

router.post('/verify-user', codeValidator, validate, authController.verifyUser )

router.post('/forgot-password', emailValidator, validate, authController.forgotPasswordCode)

router.post('/recover-password', recoverPasswordValidator, validate, authController.recoverPassword)

router.post('/change-password', isAuth, changePasswordValidator, validate, authController.changePassword)




export default router;
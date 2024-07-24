import User from "../models/user";
import Verification from "../models/verification";
import { Response, NextFunction, Request } from "express";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePassword";
import generateToken from "../utils/generateToken";
import generateCode from "../utils/generateCode";
import sendEmail from "../utils/sendEmail";

const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { fullname, email, password , role} = req.body;

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ fullname, email, password: hashedPassword , role});
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

  
    if (!user) {
      res.statusCode = 400;
      throw new Error("User doesn't exist.");
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      res.statusCode = 401;
      throw new Error("Invalid password");
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({
        code: 200,
        status: true,
        message: "User logged in successfully",
        data: { token },
      });
  } catch (error) {
    next(error);
  }
};
const verifyCode = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.statusCode = 401;
      throw new Error("Email not registered");
    }

    const { code, expiresAt } = generateCode(6, 5);

    const verification = await Verification.findOneAndUpdate(
      { userId: user._id, type: "emailVerification" },
      { verificationCode: code, expiresAt, isVerified: false },
      { new: true, upsert: true }
    );

    console.log(verification.verificationCode);

    await sendEmail({
      emailTo: user.email,
      subject: "Verification Code",
      code,
      content: "verify your account",
    });

    res
      .status(200)
      .json({ code: 200, status: true, message: "Code sent successfully" });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    const currentTime = new Date();
    const user = await User.findOne({ email });

    if (!user) {
      res.statusCode = 401;
      throw new Error("Email not registered");
    }

    const verification = await Verification.findOne({
      userId: user._id,
      type: "emailVerification",
      verificationCode: code,
    });

    if (
      !verification ||
      (verification.expiresAt && currentTime > verification.expiresAt)
    ) {
      throw new Error("Verification code is invalid");
    }

    if (verification.isVerified) {
      res.statusCode = 400;
      throw new Error("User already verified");
    }

    verification.isVerified = true;
    verification.verificationCode = null;
    verification.expiresAt = null;

    await verification.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "User verified successfully" });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordCode = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.statusCode = 401;
      throw new Error("Email not registered");
    }

    const { code, expiresAt } = generateCode(6, 5);

    const verification = await Verification.findOneAndUpdate(
      { userId: user._id, type: "forgotPassword" },
      { verificationCode: code, expiresAt, isVerified: false },
      { new: true, upsert: true }
    );

    console.log(verification.verificationCode);

    await sendEmail({
      emailTo: user.email,
      subject: "Reset Password Code",
      code,
      content: "Reset your password",
    });

    res
      .status(200)
      .json({ code: 200, status: true, message: "Code sent successfully" });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, code, password } = req.body;
    const currentTime = new Date();
    const user = await User.findOne({ email });

    if (!user) {
      res.statusCode = 401;
      throw new Error("Email not registered");
    }

    const verification = await Verification.findOne({
      userId: user._id,
      type: "forgotPassword",
      verificationCode: code,
    });

   

    if (
      !verification ||
      (verification.expiresAt && currentTime > verification.expiresAt)
    ) {
      throw new Error("Verification code is invalid");
    }

    const hashedPassword = await hashPassword(password);


    user.password = hashedPassword;
    verification.verificationCode = null;
    verification.expiresAt = null;
    await user.save();

    await verification.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const {_id} = req.user
    console.log(req.user)

  const user = await User.findOne({_id})

    if (!user) {
      res.statusCode = 404;
      throw new Error("User not found!");
    }

    const match = comparePassword(oldPassword, user.password)

    if (!match){
        res.statusCode = 401
        throw new Error('Wrong password')
    }

    if (oldPassword === newPassword){
        res.statusCode = 400
        throw new Error('Old password and new password cannot be the same')
    }

    const hashedPassword = await hashPassword(newPassword)

    user.password = hashedPassword
    await user.save()

    res.status(200).json({message: 'Password changed successfully'})

  } catch (error) {
    next(error);
  }
};
export default { signup, signin, verifyCode, verifyUser, forgotPasswordCode, recoverPassword, changePassword };

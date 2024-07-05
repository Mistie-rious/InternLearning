import User from "../models/user";
import { Response, NextFunction, Request } from "express";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePassword";
import generateToken from "../utils/generateToken";
import generateCode from "../utils/generateCode";
import sendEmail from "../utils/sendEmail";

const signup = async (req: any, res: Response, next:NextFunction) => {
    try{
        const {fullname, email, password} = req.body;

        const isEmailExist = await User.findOne({email});

        if (isEmailExist) {
            res.status(400)
            throw new Error("Email already exists");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({fullname, email, password: hashedPassword})
        await newUser.save();
        res.status(201).json({message: "User created successfully"})

    }catch(error){
        next(error)
    }
}

const signin = async (req: any, res: Response, next:NextFunction) => {
    try{
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (!user) {
        res.statusCode = 400
        throw new Error("User doesn't exist.")
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
        res.statusCode = 401
        throw new Error("Invalid password")
    }

    const token = generateToken(user);



    res.status(200).json({code:200, status:true, message: "User logged in successfully", data: {token}})
}catch(error){

    next(error)

}

}

const verifyCode = async (req: any, res: Response, next:NextFunction) => {
try{
    const {email} = req.body

    const user = await User.findOne({email})

    if (!user){
        res.statusCode = 401
        throw new Error('Email not registered')
    }

    if (user.isVerified){
        res.statusCode = 400
        throw new Error('User already verified')
    }

    const code = generateCode(6)

    user.verificationCode = code
    console.log(user.verificationCode)

    await user.save()

    await sendEmail({
        emailTo: user.email,
        subject: "Verification Code",
        code,
        content: "verify your account"
    })
    
    res.status(200).json({code:200, status:true, message: "Code sent successfully"})
}catch(error){
    next(error)
}
}

export default {signup, signin, verifyCode}
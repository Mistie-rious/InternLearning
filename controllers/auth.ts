import User from "../models/user";
import { Response, NextFunction, Request } from "express";
import hashPassword from "../utils/hashPassword";

const signup = async (req: any, res: Response, next:NextFunction) => {
    try{
        const {fullname, email, password} = req.body;

        const isEmailExist = await User.findOne({email});

        if (isEmailExist) {
            return res.status(400)
            throw new Error("Email already exists");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({fullname, email, password})
        await newUser.save();
        res.status(201).json({message: "User created successfully"})

    }catch(error){
        next(error)
    }
}

export default {signup}
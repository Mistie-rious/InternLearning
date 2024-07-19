import mongoose from "mongoose";
import Content from "../models/content schema/content";
import Course from "../models/course";
import { Request, NextFunction, Response } from "express";

const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contentType, order, title, description, course, content } = req.body;

        const contentExist = await Content.findOne({ title });

        if (contentExist) {
            res.status(400).json({ message: 'Content already exists' });
            return;
        }

    
        const courseExist = await Course.findById(course);
        if (!courseExist) {
            res.status(400).json({ message: 'Course does not exist' });
            return; 
        }


        const newContent = new Content({ contentType, order, title, description, course, content });



        await newContent.save();

        await Course.findByIdAndUpdate(course, {
            $push: { content: newContent._id }
        });


        res.status(201).json({ message: "Content created successfully" });
    } catch (error) {
        next(error);
    }
};

export default { createContent };
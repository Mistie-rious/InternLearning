import { Request, Response,NextFunction } from "express";
import Progress from '../models/progress'


const addProgress = async(req:any, res: Response, next:NextFunction) => {
    try{
        const {completedContents, quizResults} = req.body
        const {id} = req.params
        const studentId = req.user._id; 
    
    

        const updatedProgress = await Progress.findOneAndUpdate(
            { student: studentId, course: id },
            { $set: { completedContents: completedContents, quizResults: quizResults } },
            { new: true, upsert: true } 
        );

        if (!updatedProgress) {
            return res.status(404).json({ message: "Progress record not found and could not be created" });
        }


    }catch(error){
        next(error)
    }
}

const getProgress = async(req:any, res: Response, next:NextFunction) => {
    try{
        const {id} = req.params
    const studentId = req.user._id; 

    const progress = await Progress.findOne({ student: studentId, course: id });

    res
      .status(200)
      .json({ data: progress, message: "Course retrieved succesfully!" });



    }catch(error){
        next(error)
    }

}
export default {addProgress, getProgress}
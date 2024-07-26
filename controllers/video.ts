import { NextFunction, Response, Request } from "express"
const path = require('path')
import {validateExtension }from '../validators/file'
import {uploadNewFile, signedUrl, deleteFileFromS3} from "../utils/awsS3"
const multer = require('multer')
import { parseExcelFile } from "../utils/excelService";
import Video from '../models/video'
import Quiz from "../models/quiz"
import Course from "../models/course"
import Content from "../models/content"

const uploadVideo= async (req: any, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
  
      if (!file) {
        res.status(400);
        throw new Error('No file uploaded');
      }
  
      const ext = path.extname(file.originalname);
      const isValidExt = validateExtension(ext);
  
      if (!isValidExt) {
        res.status(400);
        throw new Error('Invalid file extension');
      }
  
      const Key = await uploadNewFile(file, ext);
      const Url = await signedUrl(Key)
      if (Key) {
        const newVideo = new Video({
          key: Key,
          size: file.size,
          mimetype: file.mimetype,
          createdBy: req.user._id,
          url: Url
        });
  
        await newVideo.save();
  
    
          const { title, description, course, order } = req.body;
  
  
          const newContent = new Content({
            contentType: 'video',
            title,
            description,
            course,
            order,
            content: {
              video: {
                key: Key,
              },
            },
          });
  
          await newContent.save();
        }
        res.status(201).json({
            code: 201,
            status: true,
            message: 'File uploaded successfully',
            data: { Key },
          });
      }
  
     
     catch (error) {
      next(error);
    }
  };

const getSignedUrl = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {key} = req.query
        const url = await signedUrl(key)

        res.status(201).json({
            code: 200,
            status: true,
            message: 'Get signed URL',
            data: {url}
        })
    }catch(error){
        next(error)
    }
}

const deleteVideo = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {key} = req.query;

        await deleteFileFromS3(key);
        await Video.findOneAndDelete({key})

        res.status(200).json({
            code: 200,
            status: true,
            message: 'File deleted successfully!'
        })

    }catch(error){

    }
}

const uploadSpreadsheet = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const { order, title, description, course, duration } = req.body;
  
     
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
  
  
      const questions = await parseExcelFile(file.buffer);
  

      const newQuiz = new Quiz({
        questions,
        duration,
      });
      await newQuiz.save();
 
      const newContent = new Content({
        contentType: 'quiz',
        order,
        title,
        description,
        course,
        quiz: newQuiz._id,
      });
      await newContent.save();

      await Course.findByIdAndUpdate(course, {
        $push: { content: newContent._id },
      });
  
      res.status(201).json({ message: 'Quiz created successfully', newQuiz });
    } catch (error) {
      next(error);
    }
  };

const updateSpreadsheet = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const {id }= req.params
      const { order, title, description, course, duration } = req.body;
  
      const quizExist = await Quiz.findById({_id: id});
      if (!quizExist) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
  
      
      const courseExist = await Course.findById(course);
      if (!courseExist) {
        res.status(400).json({ message: 'Course does not exist' });
        return;
      }
  
      
      const questions = await parseExcelFile(file.buffer);
  
   
      quizExist.questions = questions as any;
      quizExist.duration = duration;
      await quizExist.save();

      const contentExist = await Content.findOneAndUpdate(
        { quiz: id },
        { order, title, description, course },
        { new: true }
      );
  
      if (!contentExist) {
        res.status(404).json({ message: 'Content not found' });
        return;
      }
  
     
      if (!courseExist.content.includes(contentExist._id)) {
        await Course.findByIdAndUpdate(course, {
          $push: { content: contentExist._id },
        });
      }
  
      res.status(200).json({ message: 'Quiz updated successfully', quiz: quizExist });
    } catch (error) {
      next(error);
    }
};
  

export default {uploadVideo, getSignedUrl, deleteVideo, uploadSpreadsheet, updateSpreadsheet}
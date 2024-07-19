import Course from "../models/course";
import Category from "../models/category";
import { NextFunction, Response, Request } from "express";

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
try{
const { title, description, category, author, publishedDate, content, imageUrl, duration, level } = req.body;

const isCourseExist = await Course.findOne({ title });

if (isCourseExist) {
  res.status(400);
  throw new Error("Course already exists");
}

const newCourse = new Course({ title, description, category, author, publishedDate, content, imageUrl, duration, level })
await newCourse.save();

await Course.findByIdAndUpdate(category, {
  $push: { courses: newCourse._id }
});


res.status(201).json({ message: "Course created successfully" });

}catch(error){
next(error)
}
};

const getCourses = async (req: Request, res: Response, next: NextFunction) => {
try{
   const { q, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size as string) || 10;
    const pageNumber = parseInt(page as string) || 1;

    if (q) {
      const search = new RegExp(String(q), 'i');
      query = { $or: [{ title: search }] };
    }

    const total = await Course.countDocuments(query)
    const pages = Math.ceil(total/ sizeNumber)
    const categories = await Course.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedAt: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Get courses successful',
      data: { categories, total, pages, page: pageNumber, size: sizeNumber }
    });
  } catch (error) {
    next(error);
  }
};


const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try{
const {id} = req.params

const course = await Course.findOne({_id: id})

if (!course){
  res.status(404)
  res.json({message: 'Course not found'})
}

res.status(200).json({data: course, message: 'Course retrieved succesfully!' })

  }catch(error){
next(error)
  }
}

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, category, author, publishedDate, content, imageUrl, duration, level } = req.body;
    const { id } = req.params;

    const updateData = { title, description, category, author, publishedDate, content, imageUrl, duration, level };
    const options = { new: true };

    const course = await Course.findOneAndUpdate({ _id: id }, updateData, options);

    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse  = async (req: Request, res: Response, next: NextFunction) => {
  try{
const { id } = req.params;

const course = await Course.findOneAndDelete({ _id: id });

if (!course) {
  res.status(404);
  throw new Error("Course not found");

}


res.status(200).json({data: course, message: 'Course deleted' });
  }catch(error){
next(error)
  }
}
export default {createCourse, getCourses, getCourse, updateCourse, deleteCourse};
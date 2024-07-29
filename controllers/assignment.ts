import { Request, Response, NextFunction } from "express";
import Assignment from "../models/assignment";
import Content from "../models/content";
import Course from "../models/course";
import { Submission, Grade } from "../models/submission";
const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, course, dueDate, maxScore } = req.body;
  
   
      const courseExist = await Course.findById(course);
      if (!courseExist) {
        res.status(400).json({ message: "Course does not exist" });
        return;
      }
  
      
      const newAssignment = new Assignment({
        title,
        description,
        dueDate,
        course,
        maxScore,
      });
      await newAssignment.save();
 
      let courseContent = await Content.findOne({ course });
  
      if (!courseContent) {
        courseContent = new Content({ course });
        await courseContent.save();
      }
  
    
      if (!courseContent.assignments.includes(newAssignment._id)) {
        courseContent.assignments.push(newAssignment._id);
        await courseContent.save();
      }
  
  
      res.status(201).json({ message: "Assignment created successfully", newAssignment });
    } catch (error) {
      next(error);
    }
  };
  
  
  const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, description, dueDate, maxScore } = req.body;

      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { title, description, dueDate, maxScore },
        { new: true }
      );
  
      if (!updatedAssignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
  

      const content = await Content.findOne({ course: updatedAssignment.course });
      if (content) {

        await content.save();
      }
  
      res.status(200).json({ message: "Assignment updated successfully", updatedAssignment });
    } catch (error) {
      next(error);
    }
  };
  

const getAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById({ _id: id });

    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    next(error);
  }
};
const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedAssignment = await Assignment.findByIdAndDelete({_id: id});
      if (!deletedAssignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
  
     
      const content = await Content.findOne({ course: deletedAssignment.course });
      if (content) {
        content.assignments = content.assignments.filter(assignmentId => !assignmentId.equals(id));
        await content.save();
      }
  
      res.status(200).json({ message: "Assignment and content reference deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  


  const submitAssignment = async (req: any, res: Response, next: NextFunction) => {
    try {
      const student = req.user._id;
      const { assignment, content } = req.body;
  
      const assignmentExist = await Assignment.findById({ _id: assignment });
      if (!assignmentExist) {
        res.status(400).json({ message: "Assignment does not exist" });
        return;
      }
  
      const course = await Course.findOne({ _id: assignmentExist.course });
      if (!course) {
        res.status(400).json({ message: "Course does not exist" });
        return;
      }
  
    
      let submission = await Submission.findOne({ assignment, student });
  
      if (submission) {
       
        submission.content = content;
        await submission.save();
        res.status(200).json({ message: "Assignment updated successfully", submission });
      } else {
        
        submission = new Submission({
          assignment,
          student,
          content,
        });
        await submission.save();
  
        assignmentExist.submissions.push(submission._id);
        await assignmentExist.save();
  
        res.status(201).json({ message: "Assignment submitted successfully", submission });
      }
    } catch (error) {
      next(error);
    }
  };


const gradeSubmission = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { submission, score, feedback } = req.body;

    const grader = req.user._id;
    const submissionExist = await Submission.findById(submission);
    if (!submissionExist) {
      res.status(400).json({ message: "Submission does not exist" });
      return;
    }

  
    const existingGrade = await Grade.findOne({ submission });
    if (existingGrade) {
      res.status(400).json({ message: "Submission has already been graded" });
      return;
    }


    const assignment = await Assignment.findById(submissionExist.assignment);
    if (!assignment) {
      res.status(400).json({ message: "Assignment does not exist" });
      return;
    }

    if (score > assignment.maxScore) {
      res.status(400).json({ message: `Score cannot exceed the maximum score of ${assignment.maxScore}` });
      return;
    }

    const newGrade = new Grade({
      submission,
      grader,
      score,
      feedback,
    });
    await newGrade.save();

    assignment.grades.push(newGrade._id);
    await assignment.save();

    res.status(201).json({ message: "Submission graded successfully", newGrade });
  } catch (error) {
    next(error);
  }
};


  export default { createAssignment, updateAssignment, getAssignment, deleteAssignment, submitAssignment, gradeSubmission };
  

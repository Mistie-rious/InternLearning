import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
  }],
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  }],
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  }],
}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);

export default Content;
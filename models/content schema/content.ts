import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  contentType: {
    type: String,
    required: true,
    enum: ["assignment", "quiz", "chapter", "video"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: {
    type: Number,
  },
  content: {
    assignment: {
      instructions: String,
      dueDate: Date,
      maximumMarks: Number,
    },
    quiz: {
      questions: [
        {
          text: String,
          options: [String],
          correctAnswer: Number, 
        },
      ],
      duration: Number,
    },
    chapter: {
      sections: [
        {
          title: String,
          content: String, 
        },
      ],
    },
    video: {
  
      ref: "Video",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;

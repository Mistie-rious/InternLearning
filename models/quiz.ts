import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  duration: {
    type: Number,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;

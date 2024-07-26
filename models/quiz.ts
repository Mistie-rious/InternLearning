import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
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
  questions: [questionSchema],
  duration: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;

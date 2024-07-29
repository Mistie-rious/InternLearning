import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
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
  dueDate: {
    type: Date,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  }],
  grades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  }],
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;

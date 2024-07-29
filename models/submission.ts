import mongoose from "mongoose";


const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  content: {
    type: String, 
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);


const gradeSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
  },
  grader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
  },
  gradedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Grade = mongoose.model("Grade", gradeSchema);

export { Submission, Grade };

import mongoose, { Schema } from "mongoose";

const quizResultSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
  startedAt: { type: Date, required: true },
  submittedAt: { type: Date, required: true },
  score: { type: Number, required: true },
});

const assignmentResultSchema = new Schema({
  assignmentId: { type: Schema.Types.ObjectId, required: true, ref: "Assignment" },
  submittedAt: { type: Date, required: true },
  score: { type: Number, required: true },
});




const progressSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    completedContents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    quizResults: [quizResultSchema],
    assignmentResults: [assignmentResultSchema],
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;

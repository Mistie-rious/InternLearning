import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  publishedDate: { type: Date, default: Date.now, required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  imageUrl: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    optional: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // reviews: [
  //   {
  //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //     rating: { type: Number, required: true, min: 1, max: 5 },
  //     comment: { type: String, required: true },
  //   },
  // ],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  sections: [sectionSchema],
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
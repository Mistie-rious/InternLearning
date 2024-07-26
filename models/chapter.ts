import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  tile: { type: String, required: true, unique: true },
  sections: [{ type: String }],
});

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
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
    chapter: {
      sections: [
        {
          title: String,
          content: String, 
        },
      ],
    },
    assignment: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    video: {
      url: String
    },
  },

});

const Content = mongoose.model("Content", contentSchema);

export default Content;

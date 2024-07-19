import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String, 
      or: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
      }]
    },
    order: {
      type: Number,
      required: true
    }
  });
  
  const Section = mongoose.model('Section', sectionSchema);
  
  export default Section;
  
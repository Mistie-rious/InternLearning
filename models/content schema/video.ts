import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true
    },
    duration: {
      type: Number 
    },
    transcript: {
      type: String 
    }
  });
  
  const Video = mongoose.model('Video', videoSchema);
  
  export default Video;
  
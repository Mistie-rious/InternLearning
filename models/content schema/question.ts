import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: { 
      type: String
    },
    text: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number, 
      required: true
    }
  });
  
  const Question = mongoose.model('Question', questionSchema);
  
  export default Question;
  
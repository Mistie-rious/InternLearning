import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    mimetype: {
        type: String
    },
    url:{
        type: String
    },
    duration: {
        type: Number 
    },
    transcript: {
        type: String 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
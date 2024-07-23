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
    url: {
        type: String,
        required: true
    },
    duration: {
        type: Number // Only applicable for videos
    },
    transcript: {
        type: String // Only applicable for videos
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
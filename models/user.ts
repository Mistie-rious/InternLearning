import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verificationCode: String,
    isVerified: {type: Boolean, default: false},
    forgotPasswordCode: String,
})

const User = mongoose.model('User', userSchema);

export default User;
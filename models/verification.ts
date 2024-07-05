import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    verificationCode: {
        type: String,
    },
    expiresAt: {
        type: Date,
    },
    type: {
        type: String,
        required: true,
        enum: ['emailVerification', 'forgotPassword']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
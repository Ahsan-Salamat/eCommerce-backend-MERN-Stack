import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be longer than 6 characters"],
        select: false 
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    resetpasswordToken: String,
    resetpasswordExpire: Date
},{timestamps: true});

export default mongoose.model("User", userSchema);
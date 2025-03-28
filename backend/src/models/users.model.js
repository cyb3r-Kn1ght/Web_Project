//định nghĩa collection users
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Mật khẩu cần phải có ít nhất 8 ký tự!'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true } 
);

const User = new mongoose.model("User", userSchema);

export default User;
//định nghĩa collection users
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: [8, 'Mật khẩu cần phải có ít nhất 8 ký tự!'],
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true } 
);

const User = new mongoose.model("User", userSchema);

export default User;
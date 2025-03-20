//định nghĩa collection users
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: { // cần kiểm chứng lại về document mật khẩu
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        // match: [/.+\@.+\..+/, 'Plesae fill a valid email address']
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true } 
);

const User = new mongoose.model("User", userSchema);

export default User;
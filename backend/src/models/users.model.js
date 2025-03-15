//định nghĩa collection users
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UID: {
        type: Number,
        required: true,
        unique: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true } 
);

const User = new mongoose.Model("User", userSchema);

export default User;
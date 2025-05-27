//định nghĩa collection users
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function(){
            return !this.GoogleId && !this.FacebookId;
        },

        minlength: [8, 'Mật khẩu cần phải có ít nhất 8 ký tự!'],
    },
    email: {
        type: String,
        required: function(){
            return !this.GoogleId && !this.FacebookId;
        },
        unique: true,
        // match: [/.+\@.+\..+/, 'Plesae fill a valid email address']
    },
    GoogleId: {
        type: String // Không required
    },
      FacebookId: {
        type: String // Không required
    },
    profilePic: {
        type: String,
        default: ""
    },
    tier:{
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    },remainingMessages: {
        type: Number,
        default: 10 // Số tin nhắn miễn phí ban đầu
    },

}, { timestamps: true } 
);

const User = new mongoose.model("User", userSchema);

export default User;
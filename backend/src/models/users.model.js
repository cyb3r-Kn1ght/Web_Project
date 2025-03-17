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
    Password: { // cần kiểm chứng lại về document mật khẩu
        type: String,
        required: true,
        minlength: [8, 'Mật khẩu cần phải có ít nhất 8 ký tự!'],
        validate: {
            validator: function(v) {
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Mật khẩu cần phải chứa một ký tự in hoa, in thường, ký tự đặc biệt và một chữ số!"
        }
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Xin hãy nhập vào địa chỉ email hợp lệ!']
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true } 
);

const User = new mongoose.Model("User", userSchema);

export default User;
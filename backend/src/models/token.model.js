import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires: "1d"}
    }
}, {timestamps: true});

const Token = new mongoose.model("Token", tokenSchema);
export default Token; //export Token để có thể sử dụng ở các file khác
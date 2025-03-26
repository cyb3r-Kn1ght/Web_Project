//định nghĩa collection lịch sử chat của người dùng với một người nổi tiếng
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    refModels: {
        type: String,
        required: true,
        enum: ["User", "Celeb"]
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "RefModels",
        required: true,
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "RefModels",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Chat = new mongoose.model("Chat", chatSchema);

export default Chat;
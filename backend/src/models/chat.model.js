//định nghĩa collection lịch sử chat của người dùng với một người nổi tiếng
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    ChatID: {
        type: String,
        required: true,
        unique: true
    },
    MessID: {
        type: String,
        required: true,
        unique: true
    },
    SenderID: {
        type: Number,
        required: true
    },
    Message: {
        type: String,
    }
}, {timestamps: true});

const Chat = new mongoose.model("Chat", chatSchema);

export default Chat;
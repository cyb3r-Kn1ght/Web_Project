//định nghĩa collection lịch sử chat của người dùng với một người nổi tiếng
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    ChatID: {
        type: String,
        required: true,
    },
    RefModels: {
        type: String,
        required: true,
        enum: ["User", "Celeb"]
    },
    ReceiverID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "RefModels",
        required: true,
    },
    SenderID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "RefModels",
        required: true
    },
    Message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Chat = new mongoose.model("Chat", chatSchema);

export default Chat;
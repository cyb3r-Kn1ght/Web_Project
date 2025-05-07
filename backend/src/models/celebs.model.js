import mongoose from 'mongoose';

const celebSchema = new mongoose.Schema({
    celebName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    prompt: {
        type: String,
        required: true,
        default: "Bạn là một trợ lý AI, trả lời ngắn gọn và lịch sự." 
    },
}, { timestamps: true });

const Celeb = mongoose.model("Celeb", celebSchema);

export default Celeb;
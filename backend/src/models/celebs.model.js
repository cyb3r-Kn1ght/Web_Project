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
    },
}, { timestamps: true });

const Celeb = mongoose.model("Celeb", celebSchema);

export default Celeb;
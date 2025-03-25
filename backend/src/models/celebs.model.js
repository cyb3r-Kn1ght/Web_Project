// định nghĩa collection Celeb
import mongoose from 'mongoose';

const celebSchema = new mongoose.Schema({
    isAI: {
        type: Boolean,
        default: false
    },
    celebName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const Celeb = new mongoose.model("Celeb", celebSchema);

export default Celeb;
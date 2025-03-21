// định nghĩa collection Celeb
import mongoose from 'mongoose';

const celebSchema = new mongoose.Schema({
    IsAI: {
        type: Boolean,
        default: false
    },
    CelebName: {
        type: String,
        required: true
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const Celeb = new mongoose.model("Celeb", celebSchema);

export default Celeb;
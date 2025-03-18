// định nghĩa collection Celeb
import mongoose from 'mongoose';

const celebSchema = new mongoose.Schema({
    CelebID: {
        type: String,
        required: true
    },
    CelebName: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Celeb = new mongoose.model("Celeb", celebSchema);

export default Celeb;
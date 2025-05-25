import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
},
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userType: {
    type: String,
    enum: ['user', 'google_user', 'ai'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
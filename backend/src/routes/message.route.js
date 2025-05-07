// File: routes/message.route.js
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
    getCelebsForSidebar,
    getMessages,
    sendMessage
} from '../controllers/message.controller.js';

const router = express.Router();
router.post('/send', async (req, res) => {
    try {
      const { message, receiver } = req.body;
      
      const newMessage = new Chat({
        message,
        sender: req.user._id, // Lấy từ middleware xác thực
        receiver
      });
  
      const savedMessage = await newMessage.save();
      
      // Gửi real-time
      const io = req.app.get('io');
      io.to(userSocketMap[receiver]).emit('receiveMessage', savedMessage);
      
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
router.get("/", verifyToken, getCelebsForSidebar); //hiện danh sách người nổi tiếng ở sidebar
router.get("/get/:id", verifyToken, getMessages);//hiện tin nhắn tại chat có sẵn
router.post("/send/:id", verifyToken, sendMessage);//gửi tin nhắn tại đoạn chat cụ thể

export default router;

// File: controllers/message.controller.js
import Celeb from '../models/celebs.model.js';
import Chat from '../models/chat.model.js';
import User from '../models/users.model.js';
import axios from 'axios';

//hiển thị người nổi tiếng ở sidebar bên trái
export const getCelebsForSidebar = async (req, res) => {
  try {// tìm tất cả Celeb có trong collection và hiển thị thông báo thành công
    const allCelebs = await Celeb.find({}); // select * from Celeb

    res.status(200).json(allCelebs);
  } catch (error) {
    console.error("Error in getting getCelebsForSidebar:", error.message);
    next(error);
  }
};

//khi mở một đoạn chat có sẵn, hiện ra lịch sử tin nhắn
export const getMessages = async (req, res) => {
  try {// lấy ID user và Celeb được chọn, và tìm tất cả tin nhắn do hai bên gửi và nhận
    const celebId = req.params.id;
    const userId = req.user._id;

    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: celebId },
        { sender: celebId, receiver: userId }
      ]
    }).sort({ createdAt: 1 }).populate('sender', 'username avatar');;

    res.status(200).json(messages);
  } catch (error)  {
    console.error("Error in getMessages:", error.message);
    next(error);
  }
};

// Xử lý gửi tin nhắn: lưu message của user, gọi AI và lưu message trả lời
export const sendMessage = async (req, res, next) => {
  try {
    console.log('Req.body ➞', req.body);
    const celebId = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const messageText = req.body.message;

    // 1. Lưu tin nhắn người dùng
    const userMessage = await Chat.create({
      message: messageText,
      sender: userId,
      receiver: celebId,
      userType: user.GoogleId ? 'google_user' : 'user',
      timestamp: Date.now()
    });

    // 2. Phát tin nhắn người dùng tới frontend
    const io = req.app.get('io');
    io.to(`user_${userId}`).emit('ai_typing_start');
    io.to(`user_${userId}`).emit('newMessage', {
      ...userMessage.toObject(),
      userType: user.GoogleId ? 'google_user' : 'user',
      isUserMessage: true
    });

    // 3. Gọi model nội bộ (FastAPI)
   const celeb = await Celeb.findById(celebId);
let aiText;
try {
  const modelResp = await axios.post(
    "https://c9e2-115-79-235-184.ngrok-free.app/generate", // Thay đổi endpoint thành /chat
    {
      prompt: messageText,
      api_key: "memaybeo",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );

  // Xử lý response mới
  aiText = modelResp.data.response.trim(); // Lấy từ trường response thay vì trực tiếp

} catch (err) {
      console.error("=== AI Model Error ===");
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Headers:", err.response.headers);
        console.error("Data:", err.response.data);
      } else {
        console.error("No response:", err.message);
      }

      io.to(`user_${userId}`).emit('ai_typing_end');
      return res.status(502).json({
        error: "Custom AI engine unreachable",
        details: err.response?.data || err.message,
      });
    }

    // 4. Lưu tin nhắn AI
    const aiMessage = await Chat.create({
      message: aiText,
      sender: celebId,
      receiver: userId,
      userType: 'ai'
    }).then(msg => msg.populate('sender'));

    // 5. Phát tin nhắn AI tới frontend
    io.to(`user_${userId}`).emit('newMessage', {
      ...aiMessage.toObject(),
      isUserMessage: false,
      userType: 'ai'
    });
    io.to(`user_${userId}`).emit('ai_typing_end');

    // 6. Trả về response cho client
    res.status(201).json({ userMessage, aiMessage });
  } catch (error) {
    console.error("Message handling error:", error);
    const io = req.app.get('io');
    io.to(`user_${req.user._id}`).emit('ai_typing_end');
    next(error);
  }
};
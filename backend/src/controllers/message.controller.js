// File: controllers/message.controller.js
import Celeb from '../models/celebs.model.js';
import Chat from '../models/chat.model.js';
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
export const sendMessage = async (req, res) => {
  try {
    
    const celebId = req.params.id;

    const userId = req.user._id;
    const messageText = req.body.message;

    const userMessage = await Chat.create({
      message: messageText,
      sender: userId,
      receiver: celebId // CelebId được suy ra từ receiver
    });

    // Phát tin nhắn mới tới room celebId để frontend nhận ngay
    const io = req.app.get('io');
    io.to(`user_${userId}`).emit('newMessage', userMessage);
    io.to(`celeb_${celebId}`).emit('newMessage', userMessage);
    // 2) Lấy prompt của celeb và gọi AI trả lời
    const celeb = await Celeb.findById(celebId);
    const openrouterResp = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/learnlm-1.5-pro-experimental:free",
        messages: [
          { role: 'system', content: celeb.prompt },
          { role: 'user',   content: messageText }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Celeb Chat App"
        }
      }
    );

    const aiText = openrouterResp.data.choices[0].message.content.trim();

    // 3) Lưu tin nhắn bot vào DB với receiver là userId
    const aiMessage = await Chat.create({
      message: aiText,
      sender: celebId,
      receiver: userId
    }).then(msg => msg.populate('sender')); // Populate thông tin người gửi
    //Populate trong Mongoose là một phương thức giúp tự động thay thế các trường tham chiếu (references) trong MongoDB bằng các documents thực tế từ collection được tham chiếu. Điều này giúp truy vấn và làm việc với dữ liệu liên quan trở nên dễ dàng và hiệu quả hơn.
    // Gửi tin nhắn AI qua socket
    io.to(`user_${userId}`).emit('newMessage', aiMessage);
    io.to(`celeb_${celebId}`).emit('newMessage', aiMessage);
    res.status(201).json({ userMessage, aiMessage });
  } catch (error) {
    next(error);
  }
};
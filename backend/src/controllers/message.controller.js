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

// Hàm chuyển đổi tên celeb sang persona
function convertNameToPersona(name) {
  // Trường hợp đặc biệt
  const specialCases = {
    'Sơn Tùng MTP': 'son_tung',
  };
  if (specialCases[name]) return specialCases[name];
  return name
    .normalize('NFD') // Loại bỏ dấu tiếng Việt
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, '_'); // Thay khoảng trắng bằng _
}

// Xử lý gửi tin nhắn: lưu message của user, gọi AI và lưu message trả lời
export const sendMessage = async (req, res, next) => {
  try {
    console.log('Req.body ➞', req.body);
    const celebId = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId).select('tier remainingMessages');
      // Nếu đang free và đã dùng hết lượt
  if (user.tier === 'free' && user.remainingMessages <= 0) {
     return res.status(403).json({
       error: 'Bạn đã hết số lần nhắn tin miễn phí trong ngày. Vui lòng nâng cấp gói premium để tiếp tục.'
    });
   }
    const messageText = req.body.message;
       if (user.tier === 'free') {
        user.remainingMessages -= 1;
        await user.save();
  }

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
   const persona = convertNameToPersona(celeb.celebName);
   let aiText;
   try {
     const modelResp = await axios.post(
       "https://fd43-1-55-40-249.ngrok-free.app/generate", // Thay đổi endpoint thành /chat
       {
         prompt: messageText,
         api_key: "anh_em_minh_cu_the_thoi_he_he_he",
         persona: persona
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
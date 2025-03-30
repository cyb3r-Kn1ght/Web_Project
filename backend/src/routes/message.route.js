import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getCelebsForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

//khởi tạo router để điều hướng người dùng khi đăng nhập thành công và vào giao diện chính
const router = new express.Router();

router.get("/", verifyToken, getCelebsForSidebar); //hiện danh sách người nổi tiếng ở sidebar
router.get("/get/:id", verifyToken, getMessages); //hiện tin nhắn tại chat có sẵn
router.post("/send/:id", verifyToken, sendMessage); //gửi tin nhắn tại đoạn chat cụ thể

export default router;
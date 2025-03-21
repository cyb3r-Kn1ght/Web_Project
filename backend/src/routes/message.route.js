import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getCelebsForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

//khởi tạo router để điều hướng người dùng khi đăng nhập thành công và vào giao diện chính
const router = new express.Router();

router.get("/celebs", protectRoute, getCelebsForSidebar); //hiện danh sách người nổi tiếng ở sidebar
router.get("/:id", protectRoute, getMessages); //hiện tin nhắn tại chat có sẵn
router.post("/:id", protectRoute, sendMessage); //gửi tin nhắn tại đoạn chat cụ thể

export default router;
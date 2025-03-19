import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getCelebsForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

//khởi tạo router để điều hướng người dùng khi đăng nhập thành công và vào giao diện chính
//hiện tin nhắn tại chat có sẵn, và gửi tin nhắn tại đoạn chat cụ thể
const router = new express.Router();

router.get("/celebs", protectRoute, getCelebsForSidebar);
router.get("/:id/:chatID", protectRoute, getMessages);
router.post("/:id/:chatID", protectRoute, sendMessage);

export default router;
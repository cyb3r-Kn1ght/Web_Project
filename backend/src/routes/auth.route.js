// nơi này để xử lí thông tin đăng kí, đăng nhập và đăng xuất
import express from 'express';

// định nghĩa các hàm xử lí bên trong đường dẫn này
import { signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// xử lí request đăng nhập, đăng kí và đăng xuất ở đây
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// lấy thông tin xác thực của người dùng ở đây
router.get("/check", verifyToken, checkAuth)

export default router;
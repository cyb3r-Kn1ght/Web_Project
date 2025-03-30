// nơi này để xử lí thông tin đăng kí, đăng nhập và đăng xuất
import express from 'express';
import passport from "passport";
import cookieParser from 'cookie-parser';
import {googleAuth, facebookAuth } from "../controllers/auth.controller.js"; // 🛠️ Import googleAuth

// định nghĩa các hàm xử lí bên trong đường dẫn này
import { signup, login, logout} from '../controllers/auth.controller.js';
import { forgotPassword, resetPassword} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// xử lí request đăng nhập, đăng kí và đăng xuất ở đây

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// xử lí yêu cầu quên mật khẩu ở đây
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// lấy thông tin xác thực của người dùng ở đây
router.get("/check", verifyToken)

// Đăng nhập với Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", googleAuth);

// Đăng nhập với Facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", facebookAuth);

export default router;
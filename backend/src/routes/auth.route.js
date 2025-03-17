// nơi này để xử lí thông tin đăng kí, đăng nhập và đăng xuất
import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// xử lí request đăng nhập, đăng kí và đăng xuất ở đây
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
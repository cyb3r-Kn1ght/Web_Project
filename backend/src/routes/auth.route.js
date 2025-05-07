// nơi này để xử lí thông tin đăng kí, đăng nhập và đăng xuất
import express from 'express';
import passport from 'passport';
import {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    googleAuth,
    facebookAuth,
    checkAuth
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check", verifyToken, checkAuth);

// Đăng nhập với Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", googleAuth);

// Đăng nhập với Facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", facebookAuth);

export default router;

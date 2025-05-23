// const express = require('express');

// mặc định type đang sử dụng là node, nếu muốn sử dụng require()
// có thể đổi type thành commonjs trong package.json

import express from 'express';
//sử dụng server và expressjs app đã được tạo từ socket.js
import { server, app } from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import vnpayHandler from './routes/vnpay.route.js';

import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
import session from 'express-session';
import passport from 'passport';
import './lib/passport.js'; // file này sẽ cấu hình Google & Facebook login
import cors from 'cors';

const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

app.use(express.json());
app.use(cookieParser());

// Cấu hình session cho Passport
app.use(passport.initialize());

const allowedOrigins = [
  'https://web-project-flame-five.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép request không có origin (như từ Postman)
    //from nhóm 7 with love
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Đáp ứng preflight OPTIONS cho tất cả route
app.options('*', cors());

//debug
app.use((req, res, next) => {
    console.log('Request from:', req.headers.origin);
    console.log('Request method:', req.method);
    next();
});

//lệnh này sẽ xử lí khi người dùng muốn đăng nhập, đăng kí hay đăng xuất tại đường dẫn /api/auth
app.use("/api/auth", authRoutes); 

app.use("/api/chat", messageRoutes);

app.use("/api/vnpay", vnpayHandler);

server.listen(port,"0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}/api/auth/signup`);
    ConnectDB(); // tiến hành kết nối database
}); // cần có phương thức listen() để phía server có thể nhận req từ client
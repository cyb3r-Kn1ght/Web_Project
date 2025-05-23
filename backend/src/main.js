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

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
    ? ["https://web-project-flame-five.vercel.app"] 
    : ["http://localhost:5173"],
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Origin", "Accept", "X-Requested-With"],
    exposedHeaders: ["set-cookie"]
})); //tiếp nhận thông tin từ port 5173

//app.options('*', cors()); // cho phép tất cả các phương thức OPTIONS từ mọi nguồn
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie');
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
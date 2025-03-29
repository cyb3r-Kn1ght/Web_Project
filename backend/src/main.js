// const express = require('express');

// mặc định type đang sử dụng là node, nếu muốn sử dụng require()
// có thể đổi type thành commonjs trong package.json

import express from 'express';
//sử dụng server và expressjs app đã được tạo từ socket.js
import { server, app } from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
import session from 'express-session';
import passport from 'passport';
import './lib/passport.js'; // file này sẽ cấu hình Google & Facebook login
import cors from 'cors';

// Cấu hình session cho Passport
app.use(passport.initialize());

const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

app.use(express.json());
//app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
})); //tiếp nhận thông tin từ port 3000

//lệnh này sẽ xử lí khi người dùng muốn đăng nhập, đăng kí hay đăng xuất tại đường dẫn /api/auth
app.use("/api/auth", authRoutes); 

app.use("/api/chat", messageRoutes);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/api/auth/signup`);
    ConnectDB(); // tiến hành kết nối database
}); // cần có phương thức listen() để phía server có thể nhận req từ client
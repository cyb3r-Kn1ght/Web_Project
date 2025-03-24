// const express = require('express');

// mặc định type đang sử dụng là node, nếu muốn sử dụng require()
// có thể đổi type thành commonjs trong package.json

//import express from 'express';
//sử dụng server và expressjs app đã được tạo từ socket.js
import { server, app } from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

import { ConnectDB } from './lib/db.js';
import cookieParser from 'cookieParser';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credential:true,
}));

//lệnh này sẽ xử lí khi người dùng muốn đăng nhập, đăng kí hay đăng xuất tại đường dẫn /api/auth
app.use("/api/auth", authRoutes); 

app.use("/api/message", messageRoutes);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/api/auth/signup`);
    ConnectDB(); // tiến hành kết nối database
}); // cần có phương thức listen() để phía server có thể nhận req từ client
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
import MongoStore from 'connect-mongo'; // lưu trữ session vào MongoDB
import passport from 'passport';
import './lib/passport.js'; // file này sẽ cấu hình Google & Facebook login
import cors from 'cors';

const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

const corsOptions = {
  origin: 'https://web-project-flame-five.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Powered-By']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // Session TTL (1 day)
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none', // Required for cross-domain cookies
    maxAge: 86400000
  }
}));

// Cấu hình session cho Passport
app.use(passport.initialize());
app.use(passport.session());

//debug
app.use((req, res, next) => {
  console.log('▶ Origin:', req.headers.origin);
  console.log('▶ Method:', req.method, '▶ URL:', req.originalUrl);
  next();
});


app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: Date.now()
  });
});

//lệnh này sẽ xử lí khi người dùng muốn đăng nhập, đăng kí hay đăng xuất tại đường dẫn /api/auth
app.use("/api/auth", authRoutes); 

app.use("/api/chat", messageRoutes);

app.use("/api/vnpay", vnpayHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  // Thêm headers CORS vào response lỗi
  res.header("Access-Control-Allow-Origin", "https://web-project-flame-five.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(err.status || 500).json({ error: err.message });
});

server.listen(port,"0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}/api/auth/signup`);
    ConnectDB(); // tiến hành kết nối database
}); // cần có phương thức listen() để phía server có thể nhận req từ client


// const express = require('express');

// mặc định type đang sử dụng là node, nếu muốn sử dụng require()
// có thể đổi type thành commonjs trong package.json
import express from 'express';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

import { ConnectDB } from './lib/db.js';

const app = express();
const port = 3000;


//lệnh này sẽ xử lí khi người dùng muốn đăng nhập, đăng kí hay đăng xuất tại đường dẫn /api/auth
app.use("/api/auth", authRoutes); 

app.use("api/message", messageRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/api/auth/signup`);
  ConnectDB(); // tiến hành kết nối database
}); // cần có phương thức listen() để phía server có thể nhận req từ client
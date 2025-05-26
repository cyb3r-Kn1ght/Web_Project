// làm cho server có thể cập nhật và phản hồi theo thời gian thực (không cần phải refresh mỗi lần có bất kì thay đổi gì)
/*
*
*
*
LƯU Ý: ĐÂY MỚI ĐANG LÀ SOCKET PHÍA BÊN SERVER, CẦN PHẢI CÀI ĐẶT BÊN PHÍA CLIENT (PHÍA FRONTEND) 
*
*
*
*/import { Server } from 'socket.io';
import http from 'http'; // có sẵn trong node.js
import express from 'express';
import dotenv from 'dotenv';
import Celeb from '../models/celebs.model.js';
import User from '../models/users.model.js';
import mongoose from 'mongoose';
import Chat from '../models/chat.model.js';
dotenv.config();
const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

const app = express();
const server = http.createServer(app);  // đại khái là express.js app mới tạo sẽ đóng vai trò là http server, cần làm vậy để socket.io có thể được gắn vào server
const io = new Server(server, {
    cors: {
        origin: 'https://web-project-flame-five.vercel.app',
        methods: ["GET", "POST"],
        credentials: true
    }//Cross-Origin Resource Sharing: Chỉ những request có nguồn là http://localhost:${port} được tiếp nhận
    /*
    để giải thích thêm, socket.io server và http server mới tạo khả năng có origin khác nhau
    nên để hai server có thể trao đổi thông tin với nhau (bypass same-origin policy) cần để nguồn của 
    http server làm nơi sẽ tiếp nhận thông tin
    */
});

app.set('io', io);

const aiSocketMap = {}; // {celebId: socketId}

const userSocketMap = {}; // {userId: socketId}

export function getAISocket(celebId) {
    return aiSocketMap[celebId];
}

export function getReceiverSocket(userId) {
    return userSocketMap[userId];
}

io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    
    try {
        // Add a check for Google-authenticated users
        const user = await User.findById(new mongoose.Types.ObjectId(userId));
        
        // First check if it's a regular user
        if (user) {
            userSocketMap[userId] = socket.id;
            socket.join(`user_${userId}`);
            socket.data.userType = user.GoogleId ? 'google_user' : 'user'; // Determine user type
            socket.data.userId = userId;
            socket.data.authType = user.GoogleId ? 'google_user' : 'user'; // Determine auth type
            console.log(`User connected: ${userId} (${socket.id})`);
            return; // Exit early if it's a user
        }

        // Kiểm tra xem có phải AI (Celeb)
        const celeb = await Celeb.findOne({
            _id: new mongoose.Types.ObjectId(userId)
        });

        if (celeb) {
            // Lưu socket cho AI
            aiSocketMap[celeb._id.toString()] = socket.id;
            socket.data.userType = 'ai';
            socket.data.celebId = celeb._id.toString();

            socket.join(`celeb_${celeb._id}`);
            console.log(`AI connected: ${celeb.celebName} (${socket.id})`);
        } else {
            console.log(`Unknown connection type for userId: ${userId}`);
            socket.disconnect();
        }
    } catch (error) {
        console.log("Connection error:", error);
        socket.disconnect();
    }

    socket.on('sendMessage', async (messageData) => {
        try {
            // Thêm điều kiện kiểm tra user đã join room
            const userRoom = `user_${messageData.sender}`;
            const userSockets = await io.in(userRoom).fetchSockets();
            
            if (userSockets.length === 0) {
                console.log(`User ${messageData.sender} chưa join room!`);
                return;
            }

            io.to(`user_${messageData.sender}`).emit('ai_typing_start');
            const newMessage = new Chat({
                message: messageData.content,
                sender: messageData.sender,
                receiver: messageData.receiver
            });
              
            // Khi lưu tin nhắn, populate sender
            const savedMessage = await newMessage.save()
            .then(msg => msg.populate('sender')); // Thêm populate

            // Gửi tin nhắn đã populate đến client
            io.to(`user_${messageData.sender}`).emit('newMessage', savedMessage);
             const receiverId = messageData.receiver;
             if (aiSocketMap[receiverId]) {
       io.to(aiSocketMap[receiverId]).emit('receiveMessage', savedMessage);
    } else if (userSocketMap[receiverId]) {
      // receiver là một user bình thường
     io.to(`user_${receiverId}`).emit('newMessage', savedMessage);
   }
        } catch (error) {
            console.log("🔴 Error sending message:", error);
        }
    });

    //chatroom sử dụng socket.io
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`✅ Joined room: ${roomId}`);
    });
    
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`🚪 Left room: ${roomId}`);
    });
    app.set('io', io);
    socket.on("disconnect", () => {
        try {
            // Rời tất cả rooms
            const rooms = Object.keys(socket.rooms);
            rooms.forEach(room => socket.leave(room));

            if (socket.data.userType === 'ai') {
                delete aiSocketMap[socket.data.celebId];
                console.log(`AI disconnected: ${socket.data.celebId} (${socket.id})`);
            } else {
                delete userSocketMap[socket.data.userId];
                console.log(`${socket.data.userType} disconnected: ${socket.data.userId} (${socket.id})`);
            }
        } catch (error) {
            console.log("Disconnection error:", error);
        }
    });
});

export { app, server, io };
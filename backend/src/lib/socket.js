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
import mongoose from 'mongoose';
import Chat from '../models/chat.model.js';
dotenv.config();
const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

const app = express();
const server = http.createServer(app);  // đại khái là express.js app mới tạo sẽ đóng vai trò là http server, cần làm vậy để socket.io có thể được gắn vào server
const io = new Server(server, {
    cors: {
        origin: [
            'https://web-project-flame-five.vercel.app'
        ],
        methods: ["GET", "POST"],
        credentials: true
    }//Cross-Origin Resource Sharing: Chỉ những request có nguồn là http://localhost:${port} được tiếp nhận
    /*
    để giải thích thêm, socket.io server và http server mới tạo khả năng có origin khác nhau
    nên để hai server có thể trao đổi thông tin với nhau (bypass same-origin policy) cần để nguồn của 
    http server làm nơi sẽ tiếp nhận thông tin
    */
});

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
        // Kiểm tra xem có phải AI (Celeb)
        const celeb = await Celeb.findOne({
            _id: new mongoose.Types.ObjectId(userId),
            isAI: true
        });

        if (celeb) {
            // Lưu socket cho AI
            aiSocketMap[celeb._id.toString()] = socket.id;
            socket.data.userType = 'ai';
            socket.data.celebId = celeb._id.toString();
            console.log(`AI connected: ${celeb.celebName} (${socket.id})`);
        } else {
            // Lưu socket cho user thường
            userSocketMap[userId] = socket.id;
            socket.data.userType = 'user';
            socket.data.userId = userId;
            console.log(`User connected: ${userId} (${socket.id})`);
        }
    } catch (error) {
        console.log("Connection error:", error);
    }

    socket.on('sendMessage', async (messageData) => {
        try {
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
            if (socket.data.userType === 'ai') {
                delete aiSocketMap[socket.data.celebId];
                console.log(`AI disconnected: ${socket.data.celebId} (${socket.id})`);
            } else {
                delete userSocketMap[socket.data.userId];
                console.log(`User disconnected: ${socket.data.userId} (${socket.id})`);
            }
        } catch (error) {
            console.log("Disconnection error:", error);
        }
    });
});

export { app, server, io };
// làm cho server có thể cập nhật và phản hồi theo thời gian thực (không cần phải refresh mỗi lần có bất kì thay đổi gì)
/*
*
*
*
LƯU Ý: ĐÂY MỚI ĐANG LÀ SOCKET PHÍA BÊN SERVER, CẦN PHẢI CÀI ĐẶT BÊN PHÍA CLIENT (PHÍA FRONTEND) 
*
*
*
*/
import { Server } from 'socket.io';
import http from 'http'; // có sẵn trong node.js
import express from 'express';
import dotenv from 'dotenv';
import Celeb from '../models/celebs.model.js';

dotenv.config();
const port = process.env.PORT || 4000; //port mặc định phòng trường hợp không có biến PORT trong .env

const app = express();
const server = http.createServer(app); // đại khái là express.js app mới tạo sẽ đóng vai trò là http server, cần làm vậy để socket.io có thể được gắn vào server
const io = new Server(server, {
    cors: {
        origin: [`http://localhost:5173`]
    } //Cross-Origin Resource Sharing: Chỉ những request có nguồn là http://localhost:${port} được tiếp nhận
    /*
    để giải thích thêm, socket.io server và http server mới tạo khả năng có origin khác nhau
    nên để hai server có thể trao đổi thông tin với nhau (bypass same-origin policy) cần để nguồn của 
    http server làm nơi sẽ tiếp nhận thông tin
    */
});

//lưu trữ một hashmap để cho biết AI đang online
//định dạng: {CelebName: socketID}
//để giải thích, id AI đã là riêng biệt, nên sẽ đóng vai trò là một key
//còn socket được cấp phát khi AI kết nối tới server, nên sẽ đóng vai trò là value
const aiSocketMap = {};
const userSocketMap = {}; //tương tự như trên {userID: socketID}

export function getAISocket(celebName) {
    return aiSocketMap[celebName];
}

export function getReceiverSocket(userId) {
    return userSocketMap[userId];
}

//socket.io server sẽ lắng nghe tín hiệu kết nối và cấp phát socket cho client khi điều này xảy ra
//socket này cũng sẽ lắng nghe tín hiệu ngắt kết nối, các dòng console.log để kiểm soát luồng truy cập và debugging
io.on("connection", async (socket) => {
    //lấy thông tin client đã truyền vào để kết nối tới server để xác minh
    const userId = socket.handshake.query.userId;
    try {
        const celeb = await Celeb.findOne({celebName: userId}); //findOne() là method trả về một document

        if (celeb && celeb.IsAI) {
            aiSocketMap[celeb.celebName] = socket.id;
            console.log(`AI has been connected, ${userId}`);
        } else {
            userSocketMap[userId] = socket.id;
            console.log(`A user has been connected, ${userId}`);
        }
    } catch (error) {
        console.log("Error checking Celeb:", error);
    }

    socket.on("disconnect", async () => {
        const celeb = await Celeb.findOne({CelebName: userId}); //findOne() là method trả về một document
        try {
            if (celeb && celeb.isAI) {
                delete aiSocketMap[celeb.CelebName];
                console.log(`AI has been disconnected, ${socket.id}`);
            } else {
                delete userSocketMap[userId];
                console.log(`A user has been disconnected, ${socket.id}`);
            }
        } catch (error) {
            console.log("Error in disconnection check: ", error)
        }
    })
});

export { app, server, io };
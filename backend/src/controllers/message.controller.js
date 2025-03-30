import { getAISocket, getReceiverSocket, io } from '../lib/socket.js';
import Celeb from '../models/celebs.model.js';
import Chat from '../models/chat.model.js';
import User from '../models/users.model.js';

//hiển thị người nổi tiếng ở sidebar bên trái
export const getCelebsForSidebar = async (req, res) => {
    try { // tìm tất cả Celeb có trong collection và hiển thị thông báo thành công
        const allCelebs = await Celeb.find({}); // select * from Celeb

        res.status(200).json(allCelebs);
    } catch(error) {
        console.error("Error in getting getCelebsForSideBar:", error.message);
        res.status(500).json({error: "Internal server error!"});
    }
};

//khi mở một đoạn chat có sẵn, hiện ra lịch sử tin nhắn
export const getMessages = async (req, res) => {
    try { // lấy ID user và Celeb được chọn, và tìm tất cả tin nhắn do hai bên gửi và nhận
        const { id: userToChatId } = req.params; // từ tham số của req, lấy tham số id của Celeb và đặt tên lại thành userToChatId
        const myId = req.user._id; // lấy tham số id của người gửi request (là user)

        const messages = await Chat.find({
            $or: [
                {senderID:myId, receiverID:userToChatId},
                {senderID:userToChatId, receiverID:myId},
            ]
        });

        res.status(200).json(messages);
    } catch(error) {
        console.error("Error in getting getMessages:", error.message);
        res.status(500).json({error: "Internal server error!"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        // từ tham số của req, lấy tham số id của người nhận và đặt tên lại thành ReceiverID
        const { id: receiverID } = req.params; 
        const senderID = req.user._id; // lấy tham số id của người gửi request
        const Text = req.body.message; // truy xuất nội dung tin nhắn của người gửi

        const newMessage = new Chat ({
            receiverID,
            senderID,
            message: Text
        })

        await newMessage.save(); //lưu tin nhắn được gửi về csdl

        // xử lí gửi tin nhắn sau với socket.io
        const celeb = await Celeb.findOne({_id: receiverID});
        if (celeb) {
            const ReceiverSocketID = getAISocket(celeb.celebName);
            if (ReceiverSocketID) {
                io.to(ReceiverSocketID).emit("newMessage", newMessage);
            }
        } else {
            const user = await User.findOne({_id: receiverID});
            if (user) {
                const ReceiverSocketID = getReceiverSocket(receiverID);
                if (ReceiverSocketID) {
                    io.to(ReceiverSocketID).emit("newMessage", newMessage);
                }
            }
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in getting sendMessage:", error.message);
        res.status(500).json({error: "Internal server error!"});
    }
}
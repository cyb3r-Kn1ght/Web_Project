//
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages:[],
    celebs:[],
    selectedCeleb:null,
    isCelebsLoading:false,

    getCelebs: async () => {
        set({isCelebsLoading:true});
            
        try {
            const res = await axiosInstance("/message/celebs");
            set({celebs: res.data});
        } catch (error) {
            //thông báo lỗi ở đây
        } finally {
            set({isCelebsLoading:false});
        }
    },

    getMessages: async (myId) => { //lấy id người dùng để có thể load lịch sử tin nhắn với AI cụ thể
            
        try {
            const res = await axiosInstance(`/message/${myId}`);
            set({messages: res.data});
        } catch (error) {
            //thông báo lỗi ở đây
        }
    },

    sendMessage: async (messageData) => {
        const { selectedCeleb, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedCeleb._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            //lỗi ở đây
        }
    },

    subscribeToMessages: () => { //cập nhật tin nhắn mới vào lịch sử chat
        const { selectedCeleb } = get();
        if (!selectedCeleb) return; //nếu chưa vào khung chat nào thì kết thúc hàm

        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedCeleb = newMessage.SenderID === selectedCeleb._id;
            if (!isMessageSentFromSelectedCeleb) return;
        
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },
}));
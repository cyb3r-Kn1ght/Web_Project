//
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages:[],
    celebs:[],
    useSelectedCeleb:null,
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
        const { useSelectedCeleb, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${useSelectedCeleb._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            //lỗi ở đây
        }
    },

    subscribeToMessages: () => { //cập nhật tin nhắn mới vào lịch sử chat
        const { useSelectedCeleb } = get();
        if (!useSelectedCeleb) return; //nếu chưa vào khung chat nào thì kết thúc hàm

        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedCeleb = newMessage.SenderID === useSelectedCeleb._id;
            if (!isMessageSentFromSelectedCeleb) return;
        
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    // New: Method to update the selected celebrity
    setSelectedCeleb: (celeb) => set({ useSelectedCeleb: celeb }),
}));
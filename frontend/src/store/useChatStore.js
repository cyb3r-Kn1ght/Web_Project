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
            const res = await axiosInstance("/chat");
            set({celebs: res.data});
        } catch (error) {
            //thông báo lỗi ở đây
        } finally {
            set({isCelebsLoading:false});
        }
    },

    getMessages: async (myId) => { //lấy id người dùng để có thể load lịch sử tin nhắn với AI cụ thể
        if (!myId) return;
        try {
            const res = await axiosInstance(`/chat/get/${myId}`);
            set({messages: res.data});
        } catch (error) {
            //thông báo lỗi ở đây
        }
    },

    sendMessage: async (messageData) => {
        const { useSelectedCeleb, messages } = get();
        try {
            const res = await axiosInstance.post(`/chat/send/${useSelectedCeleb._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            //lỗi ở đây
        }
    },

    subscribeToMessages: () => { //cập nhật tin nhắn mới vào lịch sử chat
        const { useSelectedCeleb } = get();
        if (!useSelectedCeleb) return; //nếu chưa vào khung chat nào thì kết thúc hàm

        const socket = useAuthStore.getState().socket;
        console.log("Socket:", socket);
        if (!socket) return;
    
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedCeleb = newMessage.SenderID === useSelectedCeleb._id;
            if (!isMessageSentFromSelectedCeleb) return;
        
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage"); //ngừng tiếp nhận tin nhắn sau khi không ở khung chat hiện tại
    },

    // New: Method to update the selected celebrity
    setSelectedCeleb: (useSelectedCeleb) => set({ useSelectedCeleb }),
}));
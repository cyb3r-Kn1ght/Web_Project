// File: client/src/store/useChatStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    celebs: [],
    useSelectedCeleb: null,
    isCelebsLoading: false,

    getCelebs: async () => {
        set({ isCelebsLoading: true });
        try {
            const res = await axiosInstance("/api/chat"); 
            set({ celebs: res.data });
        } catch (error) {
            // Xử lý lỗi
        } finally {
            set({ isCelebsLoading: false });
        }
    },

    getMessages: async (myId) => {
        if (!myId) return;
        try {
            const res = await axiosInstance(`/api/chat/get/${myId}`);
            set({ messages: res.data });
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    },

    sendMessage: async (messageData) => {
        const { useSelectedCeleb, messages } = get();
        const authUser = useAuthStore.getState().authUser;
        const socket = useAuthStore.getState().socket; // Lấy socket từ useAuthStore
        //tin nhắn tạm(hỗ trợ chat real-life)
        let tempMessage;
        try {
            tempMessage = {
                _id: Date.now().toString(),
                message: messageData.message,
                sender: authUser._id,
                receiver: useSelectedCeleb._id,
                userType: authUser.GoogleId ? 'google_user' : 'user',
                createdAt: new Date().toISOString(),
                isOptimistic: true
            };

            // Optimistic update tin nhắn tạm (real-time)
            set({ messages: [...messages, tempMessage] });
                // Bật trạng thải "đang trả lời"
            socket.emit('ai_typing_start');
           const res= await axiosInstance.post(`/api/chat/send/${useSelectedCeleb._id}`, messageData, {
            withCredentials: true
           });
            set((state) => ({
                messages: state.messages.map(msg =>
                  msg._id === tempMessage._id ? res.data.userMessage : msg
                )
              }));
            
            // Socket sẽ tự động cập nhật tin nhắn AI qua newMessage
            socket.emit('ai_typing_end');
            
        } catch (error) {
            console.error("Error sending message:", error);
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== tempMessage?._id)
            }));
            const socket = useAuthStore.getState().socket; 
            if (socket) socket.emit('ai_typing_end');
            
        }
    },

    subscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
            
        const handleNewMessage = (newMessage) => {
            if (newMessage.userType === 'ai') {
                set((state) => ({
                    messages: [...state.messages, newMessage]
                }));
            }
        };
      
        socket.on('newMessage', handleNewMessage);
        return () => socket.off('newMessage', handleNewMessage);
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.off("newMessage");
        }
    },

    setSelectedCeleb: (useSelectedCeleb) => set({ useSelectedCeleb }),
}))
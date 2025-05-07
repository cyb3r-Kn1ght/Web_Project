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
            const res = await axiosInstance("/chat"); 
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
            const res = await axiosInstance(`/chat/get/${myId}`);
            set({ messages: res.data });
        } catch (error) {
            // Xử lý lỗi
        }
    },

    sendMessage: async (messageData) => {
        const { useSelectedCeleb, messages } = get();
        const authUser = useAuthStore.getState().authUser;

        try {
            const tempMessage = {
                _id: Date.now().toString(),
                message: messageData.message,
                sender: authUser._id,
                receiver: useSelectedCeleb._id,
                createdAt: new Date().toISOString(),
                isOptimistic: true
            };

            // Optimistic update
            set({ messages: [...messages, tempMessage] });

            await axiosInstance.post(`/chat/send/${useSelectedCeleb._id}`, messageData);
            
            // Socket sẽ tự động cập nhật tin nhắn AI qua newMessage
        } catch (error) {
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== tempMessage._id)
            }));
            
        }
    },

    subscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        
        const handleNewMessage = (newMessage) => {
          set((state) => ({
            messages: [
              ...state.messages.filter(msg => 
                msg._id !== newMessage._id && 
                !msg.isOptimistic
              ),
              newMessage
            ]
          }));
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
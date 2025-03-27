//
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages:[], //nội dung đoạn chat với một người cụ thể
    celebs:[], //danh sách người nổi tiếng
    useSelectedCeleb:null, //chọn người nổi tiếng, mặc định là null (chưa chọn)
    isCelebsLoading:false, //cho xử lí UI, nếu đang đợi load đoạn chat ra thì có thể load màn hình chờ

    getCelebs: async () => {
        set({isCelebsLoading:true});
            
        try {
            //tại đường dẫn này thì gửi request GET tới server (backend/src/controllers/message.controller.js) để lấy danh sách người nổi tiếng để hiện lên sidebar
            const res = await axiosInstance.get("/chat/celebs");
            set({celebs: res.data}); //lấy tất cả thông tin của người nổi tiếng ở csdl vào array
        } catch (error) {
            //thông báo lỗi ở đây
        } finally {
            set({isCelebsLoading:false});
        }
    },

    getMessages: async (myId) => { //lấy id AI để có thể load lịch sử tin nhắn với AI cụ thể
            
        try {
            //tại đường dẫn này thì gửi request GET tới server (backend/src/controllers/message.controller.js) để lấy toàn bộ nội dung tin nhắn
            const res = await axiosInstance.get(`/chat/${myId}`);
            set({messages: res.data}); //đặt toàn bộ nội dung tin nhắn trong array
        } catch (error) {
            //thông báo lỗi ở đây
        }
    },

    sendMessage: async (messageData) => { //đăng tải nội dung tin nhắn lên khung chat
        const { useSelectedCeleb, messages } = get();
        try {
            // 
            const res = await axiosInstance.post(`/chat/send/${useSelectedCeleb._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            //lỗi ở đây
        }
    },

    subscribeToMessages: () => { //lắng nghe mọi tin nhắn sắp tới của người/AI và thêm vào trong lịch sử chat
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

    unsubscribeFromMessages: () => { //ngừng lắng nghe tin nhắn sắp tới của người dùng/AI
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage"); 
    },

    // hàm để cập nhật celeb được chọn
    setSelectedCeleb: (celeb) => set({ useSelectedCeleb: celeb }), 
}));
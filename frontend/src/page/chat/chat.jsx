import React, { useEffect, useState } from "react";
import "../../style/chat/chat.css";
import "../../style/chat/chatbox.css";
import "../../style/chat/sidebar.css";

import Sidebar from "../../components/chat/sidebar";
import Chatbox from "../../components/chat/chatbox";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
document.title = "AI Chatbot";

const Chat = () => {
  const { connectSocket, socket, authUser } = useAuthStore();      // kết nối socket
  const { celebs, selectedCeleb, setSelectedCeleb, getCelebs } = useChatStore();
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const checkAuth = useAuthStore(state => state.checkAuth);
    useEffect(() => {
    document.title = 'AI ChatBot';
  }, []);
  // Xử lý kết quả thanh toán
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const payment = params.get('payment');
    if (payment === 'success') {
      toast.success('Nâng cấp lên Premium thành công!');
      // Gọi lại checkAuth để cập nhật authUser.tier = 'premium'
      checkAuth();
    } else if (payment === 'failed') {
      toast.error('Thanh toán thất bại. Vui lòng thử lại.');
    } else if (payment === 'invalid' || payment === 'error') {
      toast.error('Thanh toán gặp lỗi. Vui lòng liên hệ hỗ trợ.');
    } else {
      return;
    }
    // Xóa param thanh toán khỏi URL để tránh xử lý lại khi user refresh
    params.delete('payment');
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [location.search, navigate, checkAuth]);

  useEffect(() => {
    getCelebs();                                                   // lấy danh sách celeb
  }, [getCelebs]);
  useEffect(() => {
    // Sau khi component mount
    if (!authUser) {
      useAuthStore.getState().checkAuth();
    }
  }, []);
  useEffect(() => {
    if (authUser && (!socket || !socket.connected)) {
      connectSocket();                                             // khởi tạo socket khi có authUser
    }
  }, [authUser, connectSocket, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => setIsSocketReady(true));
    socket.on("disconnect", () => setIsSocketReady(false));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);


  useEffect(() => {
    if (socket && authUser) {
      // Join room của user khi vào trang chat
      const userRoom = `user_${authUser._id}`;
      socket.emit('joinRoom', userRoom);
    }

    return () => {
      // Rời room khi component unmount
      if (socket && authUser) {
        socket.emit('leaveRoom', `user_${authUser._id}`);
      }
    };
  }, [socket, authUser]);

  const handleSelect = (celeb) => setSelectedCeleb(celeb);          // chọn celeb

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="chat-container">
      <Sidebar
        celebs={celebs}
        selectedCeleb={selectedCeleb}
        handleSelect={handleSelect}
        isCollapsed={isSidebarCollapsed} // Truyền trạng thái
        toggleSidebar={toggleSidebar}   // Truyền hàm toggle
      />
      <Chatbox isSocketReady={isSocketReady} />
    </div>
  );
};

export default Chat;
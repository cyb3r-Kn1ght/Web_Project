import React, { useEffect, useState } from "react";
import "../../style/chat/chat.css";
import "../../style/chat/chatbox.css";
import "../../style/chat/sidebar.css";

import Sidebar from "../../components/chat/sidebar";
import Chatbox from "../../components/chat/chatbox";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

document.title = "AI Chatbot";

const Chat = () => {
  const { connectSocket, socket, authUser } = useAuthStore();      // kết nối socket
  const { celebs, selectedCeleb, setSelectedCeleb, getCelebs } = useChatStore();
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    getCelebs();                                                   // lấy danh sách celeb
  }, [getCelebs]);

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

  const handleSelect = (celeb) => setSelectedCeleb(celeb);          // chọn celeb

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="chat-container">
      <div>
      <Sidebar
        celebs={celebs}
        selectedCeleb={selectedCeleb}
        handleSelect={handleSelect}
        isCollapsed={isSidebarCollapsed} // Truyền trạng thái
        toggleSidebar={toggleSidebar}   // Truyền hàm toggle
      />
      </div>
      <div className="chatbox-wrapper">
        <Chatbox isSocketReady={isSocketReady} />
      </div>
    </div>
  );
};

export default Chat;
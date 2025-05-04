import {React, useEffect,useState} from "react";
import "../../style/chat/chat.css";
import "../../style/chat/chatbox.css";
import "../../style/chat/sidebar.css";

import trumpImg from "../../assets/chat/donald-trump.jpg";
import obamaImg from "../../assets/chat/barack-obama.jpg";
import muskImg from "../../assets/chat/elon-musk.jpg";

import Sidebar from "../../components/chat/sidebar";
import Chatbox from "../../components/chat/chatbox";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

// Dữ liệu celeb tĩnh ban đầu (có thể dùng getCelebs từ backend sau)
// const celebData = [
//   {
//     id: "67dd2dba98e06072177fa271",
//     name: "Donald Trump",
//     avatar: trumpImg,
//   },
//   {
//     id: 2,
//     name: "Barack Obama",
//     avatar: obamaImg,
//   },
//   {
//     id: "67dd2d6f98e06072177fa270",
//     name: "Elon Musk",
//     avatar: muskImg,
//   },
// ];

const Chat = () => {
  // const setSelectedCeleb = useChatStore((state) => state.setSelectedCeleb);
  // const selectedCeleb = useChatStore((state) => state.useSelectedCeleb);
document.title = "AI Chatbot";
  const { setSelectedCeleb, useSelectedCeleb, celebs, getCelebs } = useChatStore();
  const { checkAuth, authUser } = useAuthStore();
  const [isSocketReady, setIsSocketReady] = useState(false);
  const { socket, connectSocket } = useAuthStore(); // lấy connectSocket từ store

  useEffect(() => {
    if (authUser && (!socket || !socket.connected)) {
      connectSocket();
    }
  }, [socket, connectSocket]);
  const handleSelect = (celeb) => {
    setSelectedCeleb(celeb);

  };

  useEffect(() => {
    getCelebs();
  }, []);
  useEffect(() => {
    if (!socket) return;
    const handleConnect = () => {
      console.log("Socket connected!");
      setIsSocketReady(true);
    };
    
    const handleDisconnect = () => {
      console.log("Socket disconnected!");
      setIsSocketReady(false);
    };
  
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
  
    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]); // Đảm bảo phụ thuộc vào socket
  
  return (
    <div className="chat-container">
      <div className="sidebar-container">
        <Sidebar
          celebs={celebs}
          selectedCeleb={useSelectedCeleb}
          handleSelect={handleSelect}
        />
      </div>
      <div className="chatbox-container">
      <Chatbox />
      </div>
    </div>
  );
};

export default Chat;

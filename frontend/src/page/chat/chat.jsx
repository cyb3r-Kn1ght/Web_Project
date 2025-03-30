import React from "react";
import "../../style/chat/chat.css";
import "../../style/chat/chatbox.css";
import "../../style/chat/sidebar.css";

import trumpImg from "../../assets/chat/donald-trump.jpg";
import obamaImg from "../../assets/chat/barack-obama.jpg";
import muskImg from "../../assets/chat/elon-musk.jpg";

import Sidebar from "../../components/chat/sidebar";
import Chatbox from "../../components/chat/chatbox";

import { useChatStore } from "../../store/useChatStore";

// Dữ liệu celeb tĩnh ban đầu (có thể dùng getCelebs từ backend sau)
const celebData = [
  {
    id: "67dd2dba98e06072177fa271",
    name: "Donald Trump",
    avatar: trumpImg,
  },
  {
    id: 2,
    name: "Barack Obama",
    avatar: obamaImg,
  },
  {
    id: "67dd2d6f98e06072177fa270",
    name: "Elon Musk",
    avatar: muskImg,
  },
];

const Chat = () => {
  const setSelectedCeleb = useChatStore((state) => state.setSelectedCeleb);
  const selectedCeleb = useChatStore((state) => state.useSelectedCeleb);

  const handleSelect = (celeb) => {
    setSelectedCeleb(celeb);
  };

  return (
    <div className="chat-container">
      <div className="sidebar-container">
        <Sidebar
          celebs={celebData}
          selectedCeleb={selectedCeleb}
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

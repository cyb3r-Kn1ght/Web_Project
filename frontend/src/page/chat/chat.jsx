import React, { useState } from 'react';
import '../style/chat/chat.css';
import '../style/chat/chatbox.css';
import '../style/chat/sidebar.css';
import trumpImg from '../assets/chat/images/donald-trump.jpg';
import obamaImg from '../assets/chat/images/barack-obama.jpg';
import muskImg from '../assets/chat/images/elon-musk.jpg';


import Sidebar from '../components/chat/sidebar';
import Chatbox from '../components/chat/chatbox';

const celebData = [
  {
    id: 1,
    name: 'Donald Trump',
    avatar: trumpImg
  },
  {
    id: 2,
    name: 'Barack Obama',
    avatar: obamaImg
  },
  {
    id: 3,
    name: 'Elon Musk',
    avatar: muskImg
  }
];

const Chat = () => {
  const [selectedCeleb, setSelectedCeleb] = useState(celebData[0]);

  return (
    <div className="chat-container">
      <div className="sidebar-container">
        <Sidebar
          celebs={celebData}
          selectedCeleb={selectedCeleb}
          handleSelect={setSelectedCeleb}
        />
      </div>
      <div className="chatbox-container">
        <Chatbox selectedCeleb={selectedCeleb} />
      </div>
    </div>
  );
};

export default Chat;

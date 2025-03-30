import React from 'react';
import HeaderChatbox from './headerchatbox';
import HistoryChatbox from './historychatbox';
import TypeChatbox from './typechatbox';
import AlertDemo from './alertdemo';

// Component này đại diện cho chatbox chính, bao gồm header, lịch sử trò chuyện và ô nhập liệu.
const Chatbox = ({ selectedCeleb }) => {
  return (
    <div className="chatbox">
      <HeaderChatbox selectedCeleb={selectedCeleb} />
      <HistoryChatbox selectedCeleb={selectedCeleb} />
      <TypeChatbox selectedCeleb={selectedCeleb} />
      <AlertDemo />
    </div>
  );
};

export default Chatbox;

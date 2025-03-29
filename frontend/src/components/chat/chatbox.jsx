import React from 'react';
import HeaderChatbox from './headerchatbox';
import HistoryChatbox from './historychatbox';
import TypeChatbox from './typechatbox';
import AlertDemo from './alertdemo';

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

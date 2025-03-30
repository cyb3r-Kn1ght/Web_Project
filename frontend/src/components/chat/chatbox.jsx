import React from 'react';
import HeaderChatbox from './headerchatbox';
import HistoryChatbox from './historychatbox';
import TypeChatbox from './typechatbox';
import AlertDemo from './alertdemo';
import { useChatStore } from '../../store/useChatStore';
import '../../style/chat/chatbox.css';

const Chatbox = () => {
  const selectedCeleb = useChatStore((state) => state.useSelectedCeleb);

  return (
    <div className="chatbox">
      <HeaderChatbox selectedCeleb={selectedCeleb} />
      <HistoryChatbox />
      <TypeChatbox />
      <AlertDemo />
    </div>
  );
};

export default Chatbox;

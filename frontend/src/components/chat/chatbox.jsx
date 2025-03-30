import React from 'react';
import HeaderChatbox from './headerchatbox';
import HistoryChatbox from './historychatbox';
import TypeChatbox from './typechatbox';
import AlertDemo from './alertdemo';
import { useChatStore } from '../../store/useChatStore.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import '../../style/chat/chatbox.css';

const Chatbox = () => {
  const {useSelectedCeleb} = useChatStore();
  return (
    <div className="chatbox">
      <HeaderChatbox selectedCeleb={useSelectedCeleb} />
      <HistoryChatbox />
      <TypeChatbox />
      <AlertDemo />
    </div>
  );
};

export default Chatbox;

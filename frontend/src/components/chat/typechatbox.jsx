import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChatStore } from "../../store/useChatStore.js";

const TypeChatbox = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
    try {
      await sendMessage({
        message: message.trim(),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  return (
    <div className="typechatbox">
      <button className='button-text-to-speech' >
        <FontAwesomeIcon icon="fa-solid fa-circle-play" />
      </button>

      <input
        className="typechatbox-input"
        placeholder="Nhập tin nhắn..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button
        className="typechatbox-send"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default TypeChatbox;

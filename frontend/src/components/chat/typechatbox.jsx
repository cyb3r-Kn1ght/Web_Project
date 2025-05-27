import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChatStore } from "../../store/useChatStore.js";
import { fetchTTSAudio } from '../../context/CuThamKhao/tts.js';

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

  const handleTTS = async () => {
    if (!message.trim()) return;
    try {
      const audioUrl = await fetchTTSAudio(message.trim());
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("TTS playback error:", err);
    }
  };

  return (
    <div className="typechatbox">

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

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChatStore } from "../../store/useChatStore.js";
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../../store/useAuthStore.js";
const TypeChatbox = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();
  const { authUser, setAuthUser  } = useAuthStore();
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (authUser.tier === 'free' && authUser.remainingMessages <= 0) {
      toast.error('Bạn đã hết số lần nhắn tin miễn phí trong ngày. Vui lòng nâng cấp gói premium để tiếp tục.');
      return;
    }
    setMessage("");
    try {
      await sendMessage({
        message: message.trim(),
      });
      setAuthUser({
  ...authUser,
  remainingMessages: authUser.remainingMessages - 1
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

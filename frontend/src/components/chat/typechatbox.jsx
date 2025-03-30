import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

const TypeChatbox = () => {
  const [message, setMessage] = useState('');

  const authUser = useAuthStore((state) => state.authUser);
  const selectedCeleb = useChatStore((state) => state.useSelectedCeleb);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleSend = async () => {
    if (!message.trim() || !authUser || !selectedCeleb) return;

    const newMessage = {
      SenderID: authUser._id,
      content: message,
    };

    await sendMessage(newMessage);
    setMessage('');
  };

  return (
    <div className="typechatbox">
      <input
        className="typechatbox-input"
        placeholder={
          selectedCeleb ? `Nhắn tin cho ${selectedCeleb.name}...` : 'Chọn người để nhắn tin...'
        }
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!selectedCeleb}
      />
      <button
        className="typechatbox-send"
        onClick={handleSend}
        disabled={!message.trim() || !selectedCeleb}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default TypeChatbox;


import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const TypeChatbox = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    // Không gửi đi đâu cả — chỉ reset message sau khi "gửi"
    console.log('Message:', message);
    setMessage('');
  };

  return (
    <div className="typechatbox">
      <input
        className="typechatbox-input"
        placeholder="Nhập tin nhắn..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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


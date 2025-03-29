import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const TypeChatbox = ({ selectedCeleb }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    setMessage('');
  };

  return (
    <div className="typechatbox">
      <input
        className="typechatbox-input"
        placeholder={`Nhắn tin cho ${selectedCeleb.name}...`}
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

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

// component này đại diện cho ô nhập liệu để người dùng có thể gửi tin nhắn đến nhân vật nổi tiếng (celeb) đã chọn
const TypeChatbox = ({ selectedCeleb }) => {
  // State để lưu nội dung tin nhắn
  const [message, setMessage] = useState('');
  // Lấy thông tin người dùng đã đăng nhập từ store
  const { authUser } = useAuthStore();
  // Lấy hàm gửi tin nhắn từ store
  const { sendMessage } = useChatStore();

  // Hàm xử lý khi người dùng nhấn nút gửi tin nhắn
  const handleSend = async () => {
    if (!message.trim() || !authUser || !selectedCeleb) return;
    // Hàm này sẽ gửi tin nhắn đến server thông qua socket
    const newMessage = {
      SenderID: authUser._id,
      content: message,
    };

    // Gửi tin nhắn đến server
    await sendMessage(newMessage);
    setMessage('');
  };

  return (
    <div className="typechatbox">
      <input
        // Input để người dùng nhập tin nhắn
        className="typechatbox-input"
        placeholder={`Nhắn tin cho ${selectedCeleb.name}...`}
        type="text"
        value={message}
        // Khi người dùng nhập tin nhắn, cập nhật state message
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        // Nút gửi tin nhắn
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

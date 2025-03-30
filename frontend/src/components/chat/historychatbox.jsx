import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

// Component này đại diện cho phần lịch sử trò chuyện trong chatbox, hiển thị các tin nhắn đã gửi và nhận giữa người dùng và người nổi tiếng được chọn.
const HistoryChatbox = ({ selectedCeleb }) => {
  // Lấy thông tin người dùng đã xác thực và các tin nhắn từ store
  const { authUser } = useAuthStore();
  // Lấy thông tin người dùng đã xác thực từ store
  const { messages, getMessages, subscribeToMessages, setSelectedCeleb } = useChatStore();

  // Khi component được mount hoặc selectedCeleb hay authUser thay đổi, thực hiện các hành động này
  useEffect(() => {
    // Nếu không có celeb được chọn hoặc người dùng không được xác thực, không làm gì cả
    if (!selectedCeleb || !authUser) return;

    // Gọi hàm setSelectedCeleb để lưu celeb được chọn vào store
    setSelectedCeleb(selectedCeleb);
    getMessages(selectedCeleb._id); // Load messages của celeb được chọn
    subscribeToMessages(); // Bắt sự kiện từ socket

  }, [selectedCeleb, authUser]);

  return (
    // Hiển thị lịch sử trò chuyện
    <div className="historychatbox">
      
      {messages.length === 0 ? (
        // Nếu không có tin nhắn nào, hiển thị thông báo
        <p style={{ textAlign: 'center', color: '#aaa', fontStyle: 'italic', marginTop: '2rem' }}>
          Nhắn tin với {selectedCeleb.name}
        </p>
      ) : (
        // Nếu có tin nhắn, hiển thị chúng
        messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.SenderID === authUser._id ? 'sent' : 'received'}`}
          >
            <p>{msg.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryChatbox;

import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import '../../style/chat/chatbox.css';

const HistoryChatbox = () => {
  const messages = useChatStore((state) => state.messages);
  const selectedCeleb = useChatStore((state) => state.useSelectedCeleb); // giữ nguyên tên như store
  const authUser = useAuthStore((state) => state.authUser);

  if (!selectedCeleb) {
    return (
      <div className="historychatbox">
        <p className="no-celeb">Vui lòng chọn một nhân vật để bắt đầu trò chuyện.</p>
      </div>
    );
  }

  return (
    <div className="historychatbox">
      {messages[selectedCeleb.id]?.length > 0 ? (
        messages[selectedCeleb.id].map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.SenderID === authUser._id ? 'sent' : 'received'}`}
          >
            <p>{msg.content}</p>
          </div>
        ))
      ) : (
        <p className="no-messages">Chưa có tin nhắn nào với {selectedCeleb.name}.</p>
      )}
    </div>
  );
};

export default HistoryChatbox;

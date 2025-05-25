import React, { useEffect, useRef,useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";

const HistoryChatbox = () => {
  const [isAITyping, setIsAITyping] = useState(false); // Thêm state để theo dõi trạng thái AI
  const {
    messages,
    getMessages,
    useSelectedCeleb,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const bottomRef = useRef(null);

  // Xử lý scroll xuống dưới cùng khi có tin nhắn mới
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //đưa user và celeb hiện tại vào room chat
  // và lấy tin nhắn giữa hai bên
  useEffect(() => {
    if (!socket || !useSelectedCeleb) return;
    const userRoom = `user_${authUser._id}`;
  
    socket.emit('joinRoom', userRoom);
    getMessages(useSelectedCeleb._id);
  
    return () => {
      socket.emit('leaveRoom', userRoom);
    };
  }, [socket, authUser._id, useSelectedCeleb]);
  //Đăng kí sự kiện cho socket để nhận tin nhắn mới
  // và hủy đăng kí khi component bị hủy
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;

    // Lắng nghe sự kiện AI đang trả lời
    socket.on('ai_typing_start', () => {
      setIsAITyping(true);
    });

    // Lắng nghe sự kiện AI đã trả lời xong
    socket.on('ai_typing_end', () => {
      setIsAITyping(false);
    });

    return () => {
      socket.off('ai_typing_start');
      socket.off('ai_typing_end');
    };
  }, [socket]);
  //Khi có tin nhắn mới, tự động cuộn xuống dưới cùng
  // và cập nhật lại danh sách tin nhắn
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="historychatbox">
      {messages.length > 0 ? (
        messages.map((message) => {
          const senderId = message.sender?._id || message.sender;
          const isUserMessage = senderId.to === authUser._id;
          return (
<div
      className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}
      key={message._id || `temp-${message.timestamp}`}
    >
              <p>{message.message}</p>
                       
            </div>
          );
        })
      ) : (
        <div className="empty-chat">
          <p>Start a conversation with {useSelectedCeleb?.celebName}!</p>
        </div>
      )}
      <div ref={bottomRef} />
      {isAITyping && (
        <div className="ai-typing-indicator">
          <span>{useSelectedCeleb?.celebName} đang trả lời</span>
          <div className="typing-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryChatbox;
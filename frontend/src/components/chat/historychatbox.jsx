import React, { useEffect, useRef } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";

const HistoryChatbox = () => {
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

  useEffect(() => {
    if (!socket || !useSelectedCeleb) return;
    const userRoom = `user_${authUser._id}`;
    const celebRoom = `celeb_${useSelectedCeleb._id}`;
  
    socket.emit('joinRoom', userRoom);
    socket.emit('joinRoom', celebRoom);
    getMessages(useSelectedCeleb._id);
  
    return () => {
      socket.emit('leaveRoom', userRoom);
      socket.emit('leaveRoom', celebRoom);
    };
  }, [socket, authUser._id, useSelectedCeleb]);
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket || !useSelectedCeleb) return;
    const userRoom = `user_${authUser._id}`;
    const celebRoom = `celeb_${useSelectedCeleb._id}`;
  
    socket.emit('joinRoom', userRoom);
    socket.emit('joinRoom', celebRoom);
    getMessages(useSelectedCeleb._id);
  
    return () => {
      socket.emit('leaveRoom', userRoom);
      socket.emit('leaveRoom', celebRoom);
    };
  }, [socket, authUser._id, useSelectedCeleb]);
  return (
    <div className="historychatbox">
      {messages.length > 0 ? (
        messages.map((message) => {
          const senderId = message.sender?._id || message.sender;
          const isUserMessage = senderId === authUser._id;
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
    </div>
  );
};

export default HistoryChatbox;
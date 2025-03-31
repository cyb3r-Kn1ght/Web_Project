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
  const { authUser } = useAuthStore();

  const bottomRef = useRef(null); // Tạo ref cho phần cuối cùng

  useEffect(() => {
    if (!useSelectedCeleb) return;
    getMessages(useSelectedCeleb._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [useSelectedCeleb, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll xuống dưới khi messages thay đổi
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  return (
    <div className="historychatbox">
      {messages && messages.length > 0 ? (
        messages.map((message) => {
          const isUserMessage = message.senderID === authUser._id;
          return (
            <div
              className="chat-message"
              key={message._id}
              // className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}
            >
              <p>{message.message}</p>
            </div>
          );
        })
      ) : (
        <p>No messages yet.</p>
      )}
      {/* Phần tử cuối cùng để scroll tới */}
      <div ref={bottomRef} />
    </div>
  );
};

export default HistoryChatbox;

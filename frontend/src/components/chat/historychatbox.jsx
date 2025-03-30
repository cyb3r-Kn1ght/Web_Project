import React, {useEffect} from 'react';
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

  useEffect(() => {
    if (!useSelectedCeleb) return;
    getMessages(useSelectedCeleb._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [useSelectedCeleb, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  
  return (
    <div className="historychatbox">
      {messages && messages.length > 0 ? (
        messages.map((message) => {
          // Check if the message is sent by the authenticated user
          const isUserMessage = message.senderID === authUser._id;
          return (
            <div 
              key={message._id} 
              //className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`} định nghĩa CSS ở đây

            >
            {<p>{message.message}</p>}
            </div>
          );
        })
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default HistoryChatbox;

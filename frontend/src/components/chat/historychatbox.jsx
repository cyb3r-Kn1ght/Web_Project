import React, { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HistoryChatbox = () => {
  const [isAITyping, setIsAITyping] = useState(false); // Thêm state để theo dõi trạng thái AI
  const [playingId, setPlayingId] = useState(null);
  const [ttsLoading, setTtsLoading] = useState(null);
  const [ttsError, setTtsError] = useState(null);
  const {
    messages,
    getMessages,
    useSelectedCeleb,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const bottomRef = useRef(null);
  const audioRef = useRef(null);

  // Xử lý scroll xuống dưới cùng khi có tin nhắn mới
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //đưa user và celeb hiện tại vào room chat
  // và lấy tin nhắn giữa hai bên
  useEffect(() => {
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
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

    const handleError = (error) => {
      console.error('Socket error:', error);
      setIsAITyping(false); // Reset typing state on error
    };

    //error handling
    socket.on('error', handleError);
    // Lắng nghe sự kiện AI đang trả lời
    socket.on('ai_typing_start', () => {
      setIsAITyping(true);
    });

    // Lắng nghe sự kiện AI đã trả lời xong
    socket.on('ai_typing_end', () => {
      setIsAITyping(false);
    });

    return () => {
      socket.off('error', handleError);
      socket.off('ai_typing_start');
      socket.off('ai_typing_end');
    };
  }, [socket]);
  //Khi có tin nhắn mới, tự động cuộn xuống dưới cùng
  // và cập nhật lại danh sách tin nhắn
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayTTS = async (message, id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(id);
    setTtsLoading(id);
    setTtsError(null);
    
    try {
      // Tạo URL với blob để tránh CORS
      const response = await fetch('https://celebritychatbot.up.railway.app/api/tts/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message })
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayingId(null);
        setTtsLoading(null);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setTtsError(id);
        setPlayingId(null);
        setTtsLoading(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      setTtsError(id);
      setPlayingId(null);
      setTtsLoading(null);
      console.error('TTS Error:', err);
    }
  };

  return (
    <div className="historychatbox">
      {messages.length > 0 ? (
        messages.map((message) => {
          const senderId = message.sender?._id || message.sender;
          const isUserMessage = message?.userType && message.userType !== 'ai';
          const isPlaying = playingId === (message._id || `temp-${message.timestamp}`);
          const isLoading = ttsLoading === (message._id || `temp-${message.timestamp}`);
          const hasError = ttsError === (message._id || `temp-${message.timestamp}`);

          return (
            <div
              className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}
              key={message._id || `temp-${message.timestamp}`}
            >
              <p>{message.message}</p>
              {!isUserMessage && (
                <button
                  className={`button-text-to-speech ${hasError ? 'error' : ''} ${isPlaying ? 'playing' : ''}`}
                  title={hasError ? "Lỗi phát âm thanh" : isLoading ? "Đang tải..." : isPlaying ? "Đang phát" : "Nghe"}
                  onClick={() => handlePlayTTS(message.message, message._id || `temp-${message.timestamp}`)}
                  disabled={isLoading || isPlaying}
                >
                  <FontAwesomeIcon icon={faHeadphones} />
                  {isLoading && <span className="tts-loading">Đang tải...</span>}
                  {isPlaying && <span className="tts-playing">Đang phát</span>}
                </button>
              )}
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
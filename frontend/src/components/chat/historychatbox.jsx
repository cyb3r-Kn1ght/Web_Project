import React, { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const HistoryChatbox = () => {
  const [isAITyping, setIsAITyping] = useState(false);
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

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
    const userRoom = `user_${authUser._id}`;
    socket.emit('joinRoom', userRoom);
    getMessages(useSelectedCeleb._id);
    return () => {
      socket.emit('leaveRoom', userRoom);
    };
  }, [socket, authUser._id, useSelectedCeleb]);

  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const handleError = (error) => {
      console.error('Socket error:', error);
      setIsAITyping(false);
    };
    socket.on('error', handleError);
    socket.on('ai_typing_start', () => setIsAITyping(true));
    socket.on('ai_typing_end', () => setIsAITyping(false));
    return () => {
      socket.off('error', handleError);
      socket.off('ai_typing_start');
      socket.off('ai_typing_end');
    };
  }, [socket]);

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

  // TTS handler: always fetch blob from backend
  const handlePlayTTS = async (message, id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(id);
    setTtsLoading(id);
    setTtsError(null);

    try {
      // 1. Gọi API FPT AI để lấy URL file mp3
      const response = await fetch('https://api.fpt.ai/hmi/tts/v5', {
        method: 'POST',
        headers: {
          'api-key': 'YOUR_FPT_API_KEY',
          'speed': '1',
          'voice': 'leminh',
          'Content-Type': 'text/plain'
        },
        body: message
      });

      if (!response.ok) throw new Error('FPT TTS request failed');
      const data = await response.json();
      const audioUrl = data.async;

      // 2. Chờ file mp3 sẵn sàng (FPT AI cần 1-2s)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Tải file mp3 về dạng blob
      const audioRes = await fetch(audioUrl);
      if (!audioRes.ok) throw new Error('Cannot fetch audio file');
      const blob = await audioRes.blob();

      // 4. Phát audio từ blob
      const blobUrl = URL.createObjectURL(blob);
      const audio = new Audio(blobUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayingId(null);
        setTtsLoading(null);
        URL.revokeObjectURL(blobUrl);
      };

      audio.onerror = () => {
        setTtsError(id);
        setPlayingId(null);
        setTtsLoading(null);
        URL.revokeObjectURL(blobUrl);
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
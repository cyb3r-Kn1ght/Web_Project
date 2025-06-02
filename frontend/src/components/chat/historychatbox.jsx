import React, { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const spinStyle = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.icon-spinning {
  animation: spin 1s linear infinite;
  display: inline-block;
}
`;

const HistoryChatbox = () => {
  const [isAITyping, setIsAITyping] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [ttsLoading, setTtsLoading] = useState(null);
  const [ttsError, setTtsError] = useState(null);
  const [audioUrlMap, setAudioUrlMap] = useState({});
  const [spinningId, setSpinningId] = useState(null);
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

  // Hàm gọi TTS backend và phát audio
  const handlePlayTTS = async (message, id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpinningId(id);

    try {
      const response = await fetch('https://celebritychatbot.id.vn/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });
      if (!response.ok) throw new Error('TTS request failed');
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setSpinningId(null);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setSpinningId(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      setSpinningId(null);
      console.error('TTS Error:', err);
    }
  };

  return (
    <>
      <style>{spinStyle}</style>
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
                  <div>
                    <button
                      className="button-text-to-speech"
                      title="Nghe"
                      onClick={async () => {
                      if (authUser.tier !== 'premium') {
                      toast.error('Tính năng Text-to-Speech chỉ dành cho tài khoản premium. Vui lòng nâng cấp.');
                      return;
                       }
                      handlePlayTTS(message.message);}}
                    >
                      <FontAwesomeIcon
                        icon={faHeadphones}
                        className={spinningId === (message._id || `temp-${message.timestamp}`) ? 'icon-spinning' : ''}
                      />
                    </button>
                    {audioUrlMap[message._id || `temp-${message.timestamp}`] && (
                      <audio
                        controls
                        src={audioUrlMap[message._id || `temp-${message.timestamp}`]}
                        style={{ marginLeft: 8, verticalAlign: 'middle' }}
                      />
                    )}
                  </div>
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
    </>
  );
};

export default HistoryChatbox;
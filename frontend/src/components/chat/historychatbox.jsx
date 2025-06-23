/*
 * HistoryChatbox.jsx – phiên bản đầy đủ, vẫn giữ mọi logic cũ (scroll, socket,
 * loading, premium check…) nhưng đổi hàm `handlePlayTTS` để gọi tới URL TTS
 * public (ví dụ ngrok) và thêm persona (backend sẽ tự dùng reference audio).
 *
 * .env (Vite) cần:
 *   VITE_TTS_URL=https://abcd1234.ngrok-free.app/tts
 */

/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

// URL dịch vụ TTS công khai (mặc định localhost để dễ dev)
const TTS_URL = import.meta.env.VITE_TTS_URL || 'https://21f6-2a09-bac5-d46f-e6-00-17-214.ngrok-free.app/tts';

// Map celebName → persona backend
const personaMap = {
  'Mỹ Tâm': 'my_tam',
  'Sơn Tùng M-TP': 'son_tung',
  'Trấn Thành': 'tran_thanh',
};

// CSS animation cho icon spinning
const spinStyle = `
@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
.icon-spinning { animation: spin 1s linear infinite; display: inline-block; }
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
  const audioRef  = useRef(null);

  /* ───────────────────────────────────
     Helpers
  ─────────────────────────────────── */
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  // Join/leave user room khi celeb thay đổi
  useEffect(() => {
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
    const userRoom = `user_${authUser._id}`;
    socket.emit('joinRoom', userRoom);
    getMessages(useSelectedCeleb._id);
    return () => socket.emit('leaveRoom', userRoom);
  }, [socket, authUser?._id, useSelectedCeleb]);

  // Subscribe chat updates
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket]);

  // Typing indicators & socket error handler
  useEffect(() => {
    if (!socket) return;
    const onErr = e => { console.error('Socket error', e); setIsAITyping(false); };
    socket.on('error', onErr);
    socket.on('ai_typing_start', () => setIsAITyping(true));
    socket.on('ai_typing_end',   () => setIsAITyping(false));
    return () => {
      socket.off('error', onErr);
      socket.off('ai_typing_start');
      socket.off('ai_typing_end');
    };
  }, [socket]);

  // Auto-scroll khi messages thay đổi
  useEffect(scrollToBottom, [messages]);

  // Cleanup audio khi unmount
  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  /* ───────────────────────────────────
     TTS handler
  ─────────────────────────────────── */
  const handlePlayTTS = async (text, id) => {
    if (!text) return;

    if (authUser.tier !== 'premium') {
      toast.error('Tính năng Text-to-Speech chỉ dành cho tài khoản Premium.');
      return;
    }

    // Stop audio đang phát
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }

    setSpinningId(id);
    setTtsLoading(id);
    setTtsError(null);

    try {
      const persona = personaMap[useSelectedCeleb?.celebName] ?? null;
      const resp = await fetch(TTS_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
         },
        body: JSON.stringify({ text, persona }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url  = URL.createObjectURL(blob);

      // Lưu url vào map để hiển thị audio control
      setAudioUrlMap(prev => ({ ...prev, [id]: url }));

      // Phát audio ngay
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = audio.onerror = () => {
        setSpinningId(null);
        setTtsLoading(null);
      };
      await audio.play();
    } catch (err) {
      console.error('TTS Error:', err);
      setTtsError(id);
      setSpinningId(null);
      setTtsLoading(null);
      toast.error('Không phát được audio');
    }
  };

  /* ───────────────────────────────────
     Render
  ─────────────────────────────────── */
  return (
    <>
      <style>{spinStyle}</style>
      <div className="historychatbox">
        {messages.length ? (
          messages.map(msg => {
            const key    = msg._id || `temp-${msg.timestamp}`;
            const isUser = msg.userType && msg.userType !== 'ai';
            return (
              <div key={key} className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
                <p>{msg.message}</p>
                {!isUser && (
                  <div>
                    <button
                      className="button-text-to-speech"
                      title="Nghe"
                      onClick={() => handlePlayTTS(msg.message, key)}
                    >
                      <FontAwesomeIcon
                        icon={faHeadphones}
                        className={spinningId === key ? 'icon-spinning' : ''}
                      />
                    </button>
                    {audioUrlMap[key] && (
                      <audio
                        controls
                        src={audioUrlMap[key]}
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
            <p>Bắt đầu trò chuyện với {useSelectedCeleb?.celebName}!</p>
          </div>
        )}
        <div ref={bottomRef} />
        {isAITyping && (
          <div className="ai-typing-indicator">
            <span>{useSelectedCeleb?.celebName} đang trả lời</span>
            <div className="typing-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryChatbox;
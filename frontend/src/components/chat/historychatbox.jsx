/*
 * HistoryChatbox.jsx – phiên bản đầy đủ (scroll, socket, premium check, biểu tượng loading),
 * gọi TTS public (ngrok) với persona + api_key. Bao gồm điều khiển audio & trạng thái play.
 *
 * Cần trong .env (Vite):
 *   VITE_TTS_URL  – URL /tts public            (ví dụ https://abcd1234.ngrok-free.app/tts)
 *   VITE_API_KEY  – api_key FastAPI yêu cầu    (mặc định "anh_em_minh_cu_the_thoi_he_he_he")
 */

/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore }   from '../../store/useAuthStore.js';
import { useChatStore }   from '../../store/useChatStore.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones }   from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

// ────────────────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────────────────
const TTS_URL = import.meta.env.VITE_TTS_URL || 'https://49f2-2405-4802-9035-38b0-55e6-5b8-bad8-e7a3.ngrok-free.app/tts';
const API_KEY = import.meta.env.VITE_API_KEY || 'anh_em_minh_cu_the_thoi_he_he_he';

const personaMap = {
  'Mỹ Tâm':        'my_tam',
  'Sơn Tùng M-TP': 'son_tung',
  'Trấn Thành':    'tran_thanh',
};

const spinStyle = `@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.icon-spinning{animation:spin 1s linear infinite;display:inline-block;}`;

export default function HistoryChatbox() {
  const [isAITyping, setIsAITyping]   = useState(false);
  const [spinningId, setSpinningId]   = useState(null);
  const [playingId,  setPlayingId]    = useState(null);
  const [ttsLoading,setTtsLoading]    = useState(null);
  const [ttsError,  setTtsError]      = useState(null);
  const [audioUrlMap, setAudioUrlMap] = useState({});

  const { messages, getMessages, useSelectedCeleb, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser, socket } = useAuthStore();

  const bottomRef = useRef(null);
  const audioRef  = useRef(null);

  // Auto scroll
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  // Room join/leave
  useEffect(() => {
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
    const room = `user_${authUser._id}`;
    socket.emit('joinRoom', room);
    getMessages(useSelectedCeleb._id);
    return () => socket.emit('leaveRoom', room);
  }, [socket, authUser?._id, useSelectedCeleb]);

  // Subscribe socket
  useEffect(() => { if (!socket) return; subscribeToMessages(); return () => unsubscribeFromMessages(); }, [socket]);

  // Typing & error
  useEffect(() => {
    if (!socket) return;
    const onErr = (e)=>{console.error('socket',e); setIsAITyping(false);};
    socket.on('error', onErr);
    socket.on('ai_typing_start', () => setIsAITyping(true));
    socket.on('ai_typing_end',   () => setIsAITyping(false));
    return () => { socket.off('error', onErr); socket.off('ai_typing_start'); socket.off('ai_typing_end'); };
  }, [socket]);

  // Cleanup audio
  useEffect(() => () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current=null; } }, []);

  // ────────────────────────────────
  // TTS handler
  // ────────────────────────────────
  const handlePlayTTS = async (text, id) => {
    if (!text) return;
    if (authUser.tier !== 'premium') return toast.error('Tính năng TTS chỉ dành cho Premium');

    // stop current audio
    if (audioRef.current) { audioRef.current.pause(); audioRef.current=null; }

    setSpinningId(id); setTtsLoading(id); setTtsError(null); setPlayingId(null);

    try {
      const speed = 1.4; // Có thể thêm tùy chọn tốc độ nếu cần
      const persona = personaMap[useSelectedCeleb?.celebName] ?? null;
      const resp = await fetch(TTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ text, persona, api_key: API_KEY , speed }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url  = URL.createObjectURL(blob);
      setAudioUrlMap(prev => ({ ...prev, [id]: url }));

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = audio.onerror = () => { setSpinningId(null); setPlayingId(null); };
      await audio.play();
      setPlayingId(id);
    } catch (err) {
      console.error('TTS', err);
      setSpinningId(null); setTtsError(id); setTtsLoading(null);
      toast.error('Không phát được audio');
    }
  };

  // ────────────────────────────────
  // Render
  // ────────────────────────────────
  return (
    <>
      <style>{spinStyle}</style>
      <div className="historychatbox">
        {messages.length ? (
          messages.map(msg => {
            const key   = msg._id || `tmp-${msg.timestamp}`;
            const isUsr = msg.userType && msg.userType !== 'ai';
            return (
              <div key={key} className={`chat-message ${isUsr ? 'user-message':'bot-message'}`}>
                <p>{msg.message}</p>
                {!isUsr && (
                  <div style={{ display:'inline-flex', alignItems:'center' }}>
                    <button className="button-text-to-speech" title="Nghe" onClick={()=>handlePlayTTS(msg.message,key)}>
                      <FontAwesomeIcon icon={faHeadphones} className={spinningId===key? 'icon-spinning':''} />
                    </button>
                    {playingId === key && <span style={{fontSize:12,marginLeft:4}}>▶️</span>}
                    {ttsError===key && <span style={{fontSize:12,color:'red',marginLeft:4}}>⚠️</span>}
                    {audioUrlMap[key] && <audio controls src={audioUrlMap[key]} style={{marginLeft:8,verticalAlign:'middle'}}/>}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-chat"><p>Hãy trò chuyện với {useSelectedCeleb?.celebName}!</p></div>
        )}
        <div ref={bottomRef}/>
        {isAITyping && (
          <div className="ai-typing-indicator"><span>{useSelectedCeleb?.celebName} đang trả lời…</span><div className="typing-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>
        )}
      </div>
    </>
  );
}

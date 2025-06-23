import React, { useEffect, useRef, useState } from 'react';
import "././style/chat/chatbox.css";
import { useAuthStore } from "././store/useAuthStore.js";
import { useChatStore } from "././store/useChatStore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                               Local helpers                                */
/* -------------------------------------------------------------------------- */

// CSS‑in‑JS spinner so chúng ta không phải sửa SCSS gốc
const spinStyle = `
@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
.icon-spinning { animation: spin 1s linear infinite; display: inline-block; }
`;

// Endpoint StyleTTS‑2 proxy trực tiếp
const TTS_ENDPOINT = import.meta.env.VITE_TTS_URL || "http://localhost:8000/tts";

/* -------------------------------------------------------------------------- */
/*                               React component                              */
/* -------------------------------------------------------------------------- */

const HistoryChatbox = () => {
  /* ------------------------------- UI states ------------------------------- */
  const [isAITyping, setIsAITyping]   = useState(false);
  const [playingId, setPlayingId]     = useState(null);   // hiển thị icon Playing nếu cần
  const [spinningId, setSpinningId]   = useState(null);   // icon loading khi đang fetch TTS
  const [audioUrlMap, setAudioUrlMap] = useState({});     // lưu blob URL cho mỗi message (để <audio> controls)

  /* ----------------------------- Global stores ----------------------------- */
  const {
    messages,
    getMessages,
    useSelectedCeleb,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();

  /* ------------------------------ Refs / misc ------------------------------ */
  const bottomRef = useRef(null);
  const audioRef  = useRef(null);

  /* -------------------------- Helpers & effects --------------------------- */
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  // Khi mount hoặc celeb/user thay đổi → join room & lấy lịch sử
  useEffect(() => {
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
    const userRoom = `user_${authUser._id}`;
    socket.emit("joinRoom", userRoom);
    getMessages(useSelectedCeleb._id);
    return () => socket.emit("leaveRoom", userRoom);
  }, [socket, authUser._id, useSelectedCeleb]);

  // Lắng nghe tin nhắn realtime từ socket
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket]);

  // Lắng nghe AI typing indicator
  useEffect(() => {
    if (!socket) return;
    const handleError = (e) => {
      console.error("Socket error:", e);
      setIsAITyping(false);
    };
    socket.on("error", handleError);
    socket.on("ai_typing_start", () => setIsAITyping(true));
    socket.on("ai_typing_end",   () => setIsAITyping(false));
    return () => {
      socket.off("error", handleError);
      socket.off("ai_typing_start");
      socket.off("ai_typing_end");
    };
  }, [socket]);

  // Auto‑scroll on new messages
  useEffect(scrollToBottom, [messages]);

  // Cleanup audio on unmount
  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  /* --------------------------- TTS main handler --------------------------- */
  const handlePlayTTS = async (text, id) => {
    // Check premium tier
    if (authUser.tier !== "premium") {
      toast.error("Tính năng Text‑to‑Speech chỉ dành cho tài khoản premium. Vui lòng nâng cấp.");
      return;
    }

    // Stop bất kỳ audio đang phát
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setSpinningId(id);
    setPlayingId(null);

    try {
      const resp = await fetch(TTS_ENDPOINT, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ text }),
      });
      if (!resp.ok) throw new Error(`TTS request failed → ${resp.status}`);

      const blob = await resp.blob();
      const url  = URL.createObjectURL(blob);

      // Lưu vào map để show <audio controls>
      setAudioUrlMap(prev => ({ ...prev, [id]: url }));

      const audio = new Audio(url);
      audioRef.current = audio;
      setPlayingId(id);

      audio.onended = () => {
        setPlayingId(null);
        setSpinningId(null);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setPlayingId(null);
        setSpinningId(null);
        URL.revokeObjectURL(url);
        toast.error("Không phát được audio");
      };

      await audio.play();
    } catch (err) {
      console.error("TTS Error:", err);
      setSpinningId(null);
      toast.error("Text‑to‑Speech lỗi :(");
    }
  };

  /* ------------------------------ JSX return ------------------------------ */
  return (
    <>
      <style>{spinStyle}</style>
      <div className="historychatbox">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isUserMessage = msg?.userType && msg.userType !== "ai";
            const keyId         = msg._id || `temp-${msg.timestamp}`;
            return (
              <div
                className={`chat-message ${isUserMessage ? "user-message" : "bot-message"}`}
                key={keyId}
              >
                <p>{msg.message}</p>

                {/* Chỉ AI message mới có nút TTS */}
                {!isUserMessage && (
                  <div>
                    <button
                      className="button-text-to-speech"
                      title="Nghe"
                      onClick={() => handlePlayTTS(msg.message, keyId)}
                    >
                      <FontAwesomeIcon
                        icon={faHeadphones}
                        className={spinningId === keyId ? "icon-spinning" : ""}
                      />
                    </button>

                    {/* Hiển thị audio control khi đã có URL */}
                    {audioUrlMap[keyId] && (
                      <audio
                        controls
                        src={audioUrlMap[keyId]}
                        style={{ marginLeft: 8, verticalAlign: "middle" }}
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

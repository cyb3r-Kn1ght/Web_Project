import { useEffect, useRef, useState } from 'react';
import '../../style/chat/chatbox.css';
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

// CSS cho hiệu ứng xoay tròn của biểu tượng tai nghe
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
  // State để quản lý các trạng thái của chatbox
  // State để quản lý animation AI đang gõ
  const [isAITyping, setIsAITyping] = useState(false);
  // State để quản lý ID của tin nhắn đang phát âm thanh
  const [playingId, setPlayingId] = useState(null);
  // State để quản lý trạng thái TTS (Text-to-Speech)
  const [ttsLoading, setTtsLoading] = useState(null);
  // State để quản lý lỗi TTS
  const [ttsError, setTtsError] = useState(null);
  // State để quản lý URL của audio đã được tạo
  const [audioUrlMap, setAudioUrlMap] = useState({});
  // State để quản lý ID của tin nhắn đang xoay biểu tượng tai nghe
  const [spinningId, setSpinningId] = useState(null);
  // Lấy các hàm và dữ liệu từ chat store
  const {
    messages,
    // Hàm để lấy danh sách tin nhắn giữa người dùng và nhân vật được chọn
    getMessages,
    // Nhân vật được chọn trong chat
    useSelectedCeleb,
    // Hàm để đăng ký nhận tin nhắn từ socket
    subscribeToMessages,
    // Hàm để hủy đăng ký nhận tin nhắn từ socket
    unsubscribeFromMessages,
  } = useChatStore();
  // Lấy thông tin người dùng đã đăng nhập và socket từ auth store
  const { authUser, socket } = useAuthStore();
  // Tham chiếu đến phần tử cuối cùng của chatbox để cuộn xuống
  const bottomRef = useRef(null);
  // Tham chiếu đến audio để phát âm thanh
  const audioRef = useRef(null);

  // Hàm để cuộn xuống cuối chatbox khi có tin nhắn mới
  const scrollToBottom = () => {
    // Nếu có phần tử cuối cùng thì cuộn xuống với hiệu ứng mượt mà
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hàm để xử lý sự kiện khi có tin nhắn mới từ socket
  useEffect(() => {
    // NẾu không có socket hoặc không có nhân vật được chọn hoặc chưa có người dùng đăng nhập thì không làm gì cả
    if (!socket || !useSelectedCeleb || !authUser?._id) return;
    // Tạo một room cho người dùng dựa trên ID của họ
    const userRoom = `user_${authUser._id}`;
    // Gửi sự kiện 'joinroom' lên server thông qua socket, yêu cầu tham gia phòng này. Server sẽ dùng phòng này để gửi tin nhắn đến người dùng
    socket.emit('joinRoom', userRoom);
    // Lấy danh sách tin nhắn từ server thông qua hàm getMessages giữa người dùng và nhân vật được chọn
    getMessages(useSelectedCeleb._id);
    return () => {
      // Khi component unmount (gỡ khỏi giao diện), rời khỏi phòng chat để không nhận tin nhắn nữa
      socket.emit('leaveRoom', userRoom);
    };
    // usereffect sẽ chạy lại khi socket, authUser._id hoặc useSelectedCeleb thay đổi
  }, [socket, authUser._id, useSelectedCeleb]);

  // Hàm để xử lý sự kiện khi có tin nhắn mới từ socket
  useEffect(() => {
    // Nếu không có socket thì không làm gì cả
    if (!socket) return;
    // Hàm để xử lý tin nhắn mới nhận được từ socket
    subscribeToMessages();
    // Hàm return sẽ gọi tới unsubscribeFromMessages để hủy đăng ký nhận tin nhắn khi component unmount
    return () => unsubscribeFromMessages();
  }, [socket]);

  // Hàm để xử lý trạng thái của AI đang gõ
  useEffect(() => {
    // Nếu không có socket thì không làm gì cả
    if (!socket) return;
    const handleError = (error) => {
      console.error('Socket error:', error);
      setIsAITyping(false);
    };
    // Khi có sự kiện 'error' từ socket, gọi hàm handleError để xử lý lỗi
    socket.on('error', handleError);
    // Khi có sự kiện 'ai_typing_start' từ socket, đặt trạng thái isAITyping thành true
    socket.on('ai_typing_start', () => setIsAITyping(true));
    // Khi có sự kiện 'ai_typing_end' từ socket, đặt trạng thái isAITyping thành false
    socket.on('ai_typing_end', () => setIsAITyping(false));
    // useEffect sẽ return một hàm để hủy đăng ký các sự kiện này khi component unmount
    return () => {
      // Hủy đăng ký các sự kiện để tránh rò rỉ bộ nhớ
      // Hủy đăng ký sự kiện 'error'
      socket.off('error', handleError);
      // Hủy đăng ký sự kiện 'ai_typing_start' và 'ai_typing_end'
      socket.off('ai_typing_start');
      socket.off('ai_typing_end');
    };
  }, [socket]);

  // Hàm để cuộn xuống cuối chatbox mỗi khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hàm để dọn dẹp audio khi component unmount
  useEffect(() => {
    return () => {
      // Nếu có audio đang phát thì dừng nó và giải phóng tài nguyên
      if (audioRef.current) {
        // Dừng audio đang phát
        audioRef.current.pause();
        // Giải phóng URL đã tạo
        audioRef.current = null;
      }
    };
  }, []);

  // Hàm gọi TTS backend và phát audio
  const handlePlayTTS = async (message, id) => {
    // Nếu audioRef hiện tại đang phát, dừng và xóa nó trước khi phát âm thanh mới
    if (audioRef.current) {
      // Dừng audio đang phát
      audioRef.current.pause();
      // Xoá audioRef để chuẩn bị cho âm thanh mới
      audioRef.current = null;
    }
    setSpinningId(id);

    try {
      // Gửi một request POST đến API TTS để chuyển đổi văn bản thành giọng nói
      const response = await fetch('https://celebritychatbot.id.vn/api/tts', {
        method: 'POST',
        // header để chỉ định nội dung là JSON
        headers: { 'Content-Type': 'application/json' },
        // body chứa văn bản cần chuyển đổi thành giọng nói
        body: JSON.stringify({ text: message })
      });
      // Nếu response không thành công, ném lỗi
      if (!response.ok) throw new Error('TTS request failed');
      // Nhận file âm thanh từ server dưới dạng blob
      const blob = await response.blob();
      // Tạo URL tạm cho trình duyệt để phát âm thanh
      const audioUrl = URL.createObjectURL(blob);
      // Tạo đối tượng Audio mới để phát âm thanh
      const audio = new Audio(audioUrl);
      // Lưu audio đó vào audioRef.current để có thể quản lý và dọn dẹp sau này
      audioRef.current = audio;

      // Khi âm thanh phát xong, giải phóng URL và đặt spinningId về null
      audio.onended = () => {
        setSpinningId(null);
        URL.revokeObjectURL(audioUrl);
      };

      // Khi có lỗi trong quá trình phát âm thanh, cũng giải phóng URL và đặt spinningId về null
      audio.onerror = () => {
        setSpinningId(null);
        URL.revokeObjectURL(audioUrl);
      };
      // Bắt đầu phát âm thanh
      await audio.play();
      // Nếu có lỗi trong quá trình phát âm thanh
    } catch (err) {
      // Nếu có lỗi trong quá trình phát âm thanh, đặt spinningId về null
      setSpinningId(null);
      // Hiển thị thông báo lỗi
      console.error('TTS Error:', err);
    }
  };

  return (
    <>
      {/* Thêm CSS cho hiệu ứng xoay tròn của biểu tượng tai nghe */}
      <style>{spinStyle}</style>
      {/* Hiển thị danh sách các tin nhắn trong chatbox */}
      <div className="historychatbox">
        {/* Nếu có tin nhắn thì hiển thị chúng, ngược lại hiển thị suggest "Start a conversation" */}
        {messages.length > 0 ? (
          // Duyệt qua từng tin nhắn và hiển thị chúng
          messages.map((message) => {
            const senderId = message.sender?._id || message.sender;
            const isUserMessage = message?.userType && message.userType !== 'ai';
            const isPlaying = playingId === (message._id || `temp-${message.timestamp}`);
            const isLoading = ttsLoading === (message._id || `temp-${message.timestamp}`);
            const hasError = ttsError === (message._id || `temp-${message.timestamp}`);
            return (
              <div
                // Thêm class để xác định loại tin nhắn (người dùng hoặc AI)
                className={`chat-message ${isUserMessage ? 'user-message' : 'bot-message'}`}
                // key là duy nhất để React có thể theo dõi các phần tử trong danh sách khi cần cập nhận, thêm, xóa
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
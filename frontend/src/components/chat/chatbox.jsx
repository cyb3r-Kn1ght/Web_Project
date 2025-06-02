import HeaderChatbox from './headerchatbox';
import HistoryChatbox from './historychatbox';
import TypeChatbox from './typechatbox';
import AlertDemo from './alertdemo';
import { useChatStore } from '../../store/useChatStore.js';
import '../../style/chat/chatbox.css';

const Chatbox = () => {
  // Lấy thông tin nhân vật được chọn từ chatstore
  const { useSelectedCeleb } = useChatStore();
  return (

    <div className="chatbox">
      {/* Nếu có nhân vật được chọn thì hiển thị các thành phần của chatbox, ngược lại hiển thị thông báo chào mừng */}
      {useSelectedCeleb ? (
        <>
          {/* Header của chatbox, hiển thị thông tin nhân vật được chọn */}
          <HeaderChatbox selectedCeleb={useSelectedCeleb} />
          {/* Lịch sử trò chuyện, hiển thị các tin nhắn đã gửi và nhận */}
          <HistoryChatbox />
          {/* Phần nhập tin nhắn, cho phép người dùng gửi tin nhắn */}
          <TypeChatbox />
          {/* Thông báo demo, hiển thị thông tin về phiên bản thử nghiệm */}
          <AlertDemo />
        </>
      ) : (
        // Nếu không có nhân vật được chọn, hiển thị thông báo chào mừng
        <div className="chatbox-placeholder">
          <span className="placeholder">Chào mừng bạn đến với AI Chatbot!</span>
        </div>
      )}
    </div>
  );
};

export default Chatbox;

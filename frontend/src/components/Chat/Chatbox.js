import Chatboxheader from "./Chatboxheader";
import Chatboxhistory from "./Chatboxhistory";
import Chattype from "./Chattype";
import '../../styles/chatBox/Chatbox.css';
//import { useSelectedCeleb } from "../../contexts/SelectedCelebContext";
import { useEffect, useState } from "react";
import Alertdemo from "./Alertdemo";
import Usericon from "./Usericon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faRobot} from "@fortawesome/free-solid-svg-icons"
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

function Chatbox() {
    const { messages, useSelectedCeleb, getMessages, sendMessage, subscribeToMessages } = useChatStore();
    const { authUser } = useAuthStore();
    /* Lấy tên người nổi tiếng đã chọn từ context */
    //const { selectedCeleb} = useSelectedCeleb();
    /* State lưu danh sách tin nhắn trò chuyện */
    //const [messages, setMessages] = useState([]);

    /* Mỗi khi chọn người nổi tiếng mới, load lịch sử đoạn chat */
    useEffect(()=>{
        if (useSelectedCeleb && authUser) {
            getMessages(authUser._id);
        }
    },[useSelectedCeleb, authUser]);

    /* Xử lý khi người dùng gửi tin nhắn */
    const handleSendMessage = (messageData) => {
        if (!useSelectedCeleb) return; //không xử lí nếu không có đối tượng gửi
        sendMessage(messageData);
        /* Cập nhật tin nhắn mới của người dùng vào mảng messages */
        //const updatedMessages = [...messages, {sender:"user", text: message}];
        //setMessages(updatedMessages);
        /* Giả lập phản hồi của bot sau 1s */

    };
    return (
        <div className="Chatbox">
            <>
            {/* Icon người dùng luôn hiển thị ở góc trên bên phải */}
            <div className="usericon">
                <Usericon />
            </div>
            {/* Khu vực tiêu đề */}
                {useSelectedCeleb ? (
                    <div className="chatbox-header">
                    {/*Nếu đã chọn celeb -> Hiện header */}
                        <Chatboxheader SelectedCeleb={useSelectedCeleb} />
                    </div>
                ) : (
                    <div className="welcome-message">
                        {/* Nếu chưa chọn celeb -> Hiện khung welcome-message*/}
                        <h2>Welcome to our AI chatbot! <FontAwesomeIcon icon={faRobot} /></h2> 
                        <p>Please select the character you want to chat with from the sidebar on the left.</p>
                    </div>
                )}
            {/* Nếu đã chọn celeb thì hiển thị phần chat */}
            {useSelectedCeleb && (
                <>
                    <Chatboxhistory messages={messages} />
                    <Chattype onSendMessage={handleSendMessage} />
                    <Alertdemo />
                </>
            )}
            </>
        </div>
    )
};

export default Chatbox;
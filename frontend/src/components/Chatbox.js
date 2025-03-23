import Chatboxheader from "./Chatboxheader";
import Chatboxhistory from "./Chatboxhistory";
import Chattype from "./Chattype";
import '../styles/Chatbox.css';
import { useSelectedCeleb } from "../contexts/SelectedCelebContext";
import { useEffect, useState } from "react";
import Alertdemo from "./Alertdemo";
import Usericon from "./Usericon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faRobot} from "@fortawesome/free-solid-svg-icons"
function Chatbox() {
    /* Lấy tên người nổi tiếng đã chọn từ context */
    const { selectedCeleb} = useSelectedCeleb();
    /* State lưu danh sách tin nhắn trò chuyện */
    const [messages, setMessages] = useState([]);

    /* Mỗi khi chọn người nổi tiếng mới, reset đoạn chat */
    useEffect(()=>{
        setMessages([]);
    },[selectedCeleb]);

    /* Xử lý khi người dùng gửi tin nhắn */
    const handleSendMessage = (message) => {
        /* Cập nhật tin nhắn mới của người dùng vào mảng messages */
        const updatedMessages = [...messages, {sender:"user", text: message}];
        setMessages(updatedMessages);
        /* Giả lập phản hồi của bot sau 1s */
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages, 
                { sender: "bot", text: `Tôi là ${selectedCeleb}` }
            ]);
        }, 1000);
    };
    return (
        <div className="Chatbox">
            <>
            {/* Icon người dùng luôn hiển thị ở góc trên bên phải */}
            <div className="usericon">
                <Usericon />
            </div>
            {/* Khu vực tiêu đề */}
            <div className="chatbox-header">
                {selectedCeleb ? (
                    <>
                    {/*Nếu đã chọn celeb -> Hiện header */}
                        <Chatboxheader SelectedCeleb={selectedCeleb} />
                    </>
                ) : (
                    <div className="welcome-message">
                        {/* Nếu chưa chọn celeb -> Hiện khung welcome-message*/}
                        <h2>Welcome to our AI chatbot! <FontAwesomeIcon icon={faRobot} /></h2> 
                        <p>Please select the character you want to chat with from the sidebar on the left.</p>
                    </div>
                )}
            </div>
            {/* Nếu đã chọn celeb thì hiển thị phần chat */}
            {selectedCeleb && (
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
import "../styles/Chatboxhistory.css";
import { useSelectedAvatar } from "../contexts/SelectedAvatarContext";
import { useSelectedCeleb } from "../contexts/SelectedCelebContext";
import React from "react";

/* Component hiển thị lịch sử tin nhắn */
function Chatboxhistory({ messages }) {
    /* Lấy ảnh và tên người nổi tiếng qua context */
    const { selectedAvatar } = useSelectedAvatar();
    const {selectedCeleb} = useSelectedCeleb();
    
    return (
        <div className="Chatboxhistory">
            {/* Duyệt qua mảng messages để hiển thị từng tin nhắn */}
            {messages.map((msg, index) => (
                <div
                    className="message-container"
                    key = {index}
                >
                    {/* Nếu người gửi message là bot thì hiển thị avatar của bot celebs đó */}
                    {msg.sender === "bot" && (
                        <img
                            src={selectedAvatar}
                            alt={selectedCeleb}
                            className="bot-avatar"
                        />
                    )}
                    {/* Chia tin nhắn của bot và người dùng ra 2 class riêng để add css phù hợp */}
                    <div className={`message ${msg.sender === "user" ? "user-messages" : "bot-messages"}`}>
                        {/* Hiển thị tin nhắn */}
                        <p> {msg.text} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chatboxhistory;
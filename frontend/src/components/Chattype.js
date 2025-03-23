import "../styles/Chattype.css";
/* import icon send */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"

/* import hook useState của react */
import { useState } from "react";
/*component chattype để hiển thị khung nhập tin nhắn người dùng */
function Chattype({onSendMessage}) {
    /* state để lưu nội dung đang được gõ */
    const [message, setMessage] = useState("");
    /* Hàm xử lý khi người dùng bấm gửi */
    const handleSend = () =>
    {
        /*Nếu tin nhắn không rỗng (sau khi loại khoảng trắng), thì thực hiện gửi tin nhắn qua prop */
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage(""); /* Xóa khung nhập sau khi gửi */
        }
    };
    /* Hàm xử lý khi người dùng nhấn enter */
    const handleEnter = (e) => {
        /* nếu người dùng nhấn enter, thực hiện hàm handleSend đã định nghĩa ở trên */
        if (e.key === "Enter") {
            handleSend();
        }
    }
    return (
        <div className = "chattype">
            {/*Ô nhập tin nhắn */}
            <input
                type = "text"
                /* Giá trị đang gõ và cập nhật state khi gõ */
                value = {message}
                onChange={(e) => setMessage(e.target.value)}
                /* Xử lý khi nhấn enter */
                onKeyDown={handleEnter}
                placeholder="Type a message..."
            /> 
            {/* button nhấn gửi, thay bằng icon cho đẹp */}
            <button onClick={handleSend}> <FontAwesomeIcon icon={faPaperPlane}/> </button>

        </div>
    )
};

export default Chattype;
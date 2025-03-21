import "../styles/Chattype.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"

import { useState } from "react";
function Chattype({onSendMessage}) {
    const [message, setMessage] = useState("");
    const handleSend = () =>
    {
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }
    return (
        <div className = "chattype">
            <input
                type = "text"
                value = {message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Type a message..."
            /> 
            <button onClick={handleSend}> <FontAwesomeIcon icon={faPaperPlane}/> </button>

        </div>
    )
};

export default Chattype;
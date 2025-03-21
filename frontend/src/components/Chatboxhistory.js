import "../styles/Chatboxhistory.css";
import { useSelectedAvatar } from "../contexts/SelectedAvatarContext";
import { useSelectedCeleb } from "../contexts/SelectedCelebContext";
import React from "react";

function Chatboxhistory({ messages }) {
    const { selectedAvatar } = useSelectedAvatar();
    const {selectedCeleb} = useSelectedCeleb();
    return (
        <div className="Chatboxhistory">
            {messages.map((msg, index) => (
                <div
                    className="message-container"
                    key = {index}
                >
                    {msg.sender === "bot" && (
                        <img
                            src={selectedAvatar}
                            alt={selectedCeleb}
                            className="bot-avatar"
                        />
                    )}
                    <div className={`message ${msg.sender === "user" ? "user-messages" : "bot-messages"}`}>
                        <p> {msg.text} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chatboxhistory;
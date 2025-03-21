import Chatboxheader from "./Chatboxheader";
import Chatboxhistory from "./Chatboxhistory";
import Chattype from "./Chattype";
import '../styles/Chatbox.css';
import { useSelectedCeleb } from "../contexts/SelectedCelebContext";
import { useEffect, useState } from "react";
import Alertdemo from "./Alertdemo";
function Chatbox() {
    const { selectedCeleb} = useSelectedCeleb();
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        setMessages([]);
    },[selectedCeleb]);
    const handleSendMessage = (message) => {
        const updatedMessages = [...messages, {sender:"user", text: message}];
        setMessages(updatedMessages);
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages, 
                { sender: "bot", text: `Tôi là ${selectedCeleb}` }
            ]);
        }, 1000);
    };
    return (
        <div className="Chatbox">

            {selectedCeleb ? (
                <>
                    <Chatboxheader SelectedCeleb={selectedCeleb} />
                    <Chatboxhistory messages={messages} />
                    <Chattype onSendMessage={handleSendMessage} />
                    <Alertdemo />
                </>
            ) : (
                <div className="welcome-message">
                    <h2 > Welcome to our AI chatbot </h2>
                    <p> Please select the character you want to chat with from the sidebar on the left. </p>
                </div>
            )}
        </div>
    )
};

export default Chatbox;
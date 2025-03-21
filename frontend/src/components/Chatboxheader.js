import "../styles/Chatboxheader.css";
import { useSelectedAvatar } from "../contexts/SelectedAvatarContext";

function Chatboxheader({SelectedCeleb}) {
    const {selectedAvatar} = useSelectedAvatar();
    return (
        <div className="Chatboxheader">
            <img src = {selectedAvatar} alt = {SelectedCeleb} />
            <h3> {SelectedCeleb ? SelectedCeleb : "Chatbox"} </h3>
        </div>
    );
};

export default Chatboxheader;
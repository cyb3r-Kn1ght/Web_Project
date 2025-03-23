import "../styles/Chatboxheader.css";
import { useSelectedAvatar } from "../contexts/SelectedAvatarContext";
/* hiển thị thông tin ở header của chatbox, gồm ảnh và tên celebs */
function Chatboxheader({SelectedCeleb}) {
    /* Lấy ảnh người nổi tiếng qua context SelectedAvatarContext */
    const {selectedAvatar} = useSelectedAvatar();
    return (
        <div className="Chatboxheader">
            {/* Hiển thị ảnh và tên người nổi tiếng */}
            <img src = {selectedAvatar} alt = {SelectedCeleb} />
            <h3> {SelectedCeleb ? SelectedCeleb : "Chatbox"} </h3>
        </div>
    );
};

export default Chatboxheader;
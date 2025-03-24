import '../../styles/chatBox/Headersidebar.css';
import { useUsername } from "../../contexts/UsernameContext";

/* components hiển thị header của sidebar */
function Headersidebar() {
    /* Lấy username người dùng từ context UsernameContext */
    const {username} = useUsername();

    /*Hiển thị dòng Welcome + username người dùng */
    return (
        <div className="Headersidebar">
            <h1> Welcome {username} !!! </h1>
        </div>
    )
}

export default Headersidebar;
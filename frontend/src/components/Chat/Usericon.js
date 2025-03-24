import React, {useState} from "react";
import '../../styles/chatBox/Usericon.css'
import IconImages from "../../assets/images/user-icon.png"
/*component để hiển thị icon người dùng ở góc trên bên phải */
function Usericon() {
    /* state để lưu trạng thái hiển thị Menu (khi nhấn vào icon) */
    const [showMenu, setShowMenu] = useState(false);
    /* Hàm xử lý khi người dùng bấm vào icon */
    const hideMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className = "user-icon">
            {/* Hiển thị icon */}
            <img
                src = {IconImages}
                alt = "user avatar"
                className="user-avatar"
                /* thực hiện hàm hideMenu khi nhấn vào */
                onClick={hideMenu}
            />
            {/* Hiển thị Menu sau khi nhấn vào */}
            {showMenu && (
                <div className="user-menu">
                    <div className="menu-item"> Thông tin người dùng </div>
                    <div className="menu-item"> Đăng xuất </div>
                </div>
            )}
        </div>
    )
}

export default Usericon;
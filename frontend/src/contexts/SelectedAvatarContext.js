/* Import các hàm cần thiết từ react */
import React, {createContext, useContext, useState} from "react";
/* Tạo context để chia sẻ dữ liệu "SelectedAvatar" (avatar của Celeb) */
const SelectedAvatarContext = createContext();
/* Provider bọc quanh app để cung cấp selected Avatar cho mọi component thành phần */
export const SelectedAvatarProvider = ({children}) => {
    /* Tạo state để lưu avatar được chọn */
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    return (
        /* Truyền state và hàm cập nhật xuống các components thành phần qua context */
        <SelectedAvatarContext.Provider value={{selectedAvatar, setSelectedAvatar}}>
            {children}
        </SelectedAvatarContext.Provider>
    );
};

/* Custom hook để lấy selectedAvatar và setSelectedAvatar dễ dàng */
export const useSelectedAvatar = () => useContext(SelectedAvatarContext);
import React, { createContext, useContext, useState } from "react";
/* Tạo context để chia sẻ dữ liệu username */
const usernameContext = createContext();
/* Tạo provider để cung cấp username cho mọi components thành phần */
export const UsernameProvider = ({ children }) => {
  /* Tạo state để lưu username người dùng */
  //const loggedUser = authUser.Username;
  const [username, setUsername] =
    useState(""); /* Thay username mặc định bằng user name người dùng ở đây */
  return (
    /* Truyền xuống các components thành phần qua context */
    <usernameContext.Provider value={{ username, setUsername }}>
      {children}
    </usernameContext.Provider>
  );
};
/* Custom hook để lấy được thông tin ở các components dễ hơn */
export const useUsername = () => {
  return useContext(usernameContext);
};

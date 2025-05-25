import React, { createContext, useContext, useState } from "react";

/* Tạo context để chia sẻ dữ liệu SelectedCeleb (celeb được chọn) */
const SelectedCelebContext = createContext();
/* Tạo provider để cung cấp selectedCeleb và setSelectedCeleb trong các components thành phần */
export const SelectedCelebProvider = ({ children }) => {
  /* tạo state để lưu celeb được chọn */
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  return (
    /* Truyền state xuống các components thành phần qua context */
    <SelectedCelebContext.Provider value={{ selectedCeleb, setSelectedCeleb }}>
      {children}
    </SelectedCelebContext.Provider>
  );
};
/* Custom hook để lấy state dễ dàng hơn */
export const useSelectedCeleb = () => useContext(SelectedCelebContext);

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import React from "react";
import { useAuthStore } from "./store/useAuthStore";

const Init = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  
  useEffect(() => {
    checkAuth(); // gọi ngay khi app khởi chạy
  }, [checkAuth]);

  return <App />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Init />
    </Router>
  </StrictMode>
);
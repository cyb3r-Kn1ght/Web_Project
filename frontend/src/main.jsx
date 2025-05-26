import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { useAuthStore } from "./store/useAuthStore";
import React from "react";
const Init = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // Gọi ngay khi frontend khởi chạy (sau Google redirect)
  }, [checkAuth]);

  return <App />;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

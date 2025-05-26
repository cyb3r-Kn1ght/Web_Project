import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Chat from "./page/chat/chat.jsx";
import Login from "./page/login/login.jsx";

function App() {
  const { isCheckingAuth, authUser } = useAuthStore();

  // 1) Đang check token? Hiển thị loading hoặc null
  if (isCheckingAuth) return null;  // hoặc <Spinner/>

  // 2) Nếu chưa login, redirect về /auth/login
  if (!authUser) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    );
  }

  // 3) Đã có authUser, show Chat
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}

export default App;

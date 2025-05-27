import Home from "./page/web_page/Home.jsx";
import Login from "./page/login/login.jsx";
import Chat from "./page/chat/chat.jsx";

import { useAuthStore } from "./store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={authUser ? <Navigate to="/chat" /> : <Login />} />
        <Route 
          path="/chat" 
          element={authUser ? <Chat /> : <Navigate to="/auth/login" />} 
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;

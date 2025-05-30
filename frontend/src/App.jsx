import Home from "./page/web_page/Home.jsx";
import Login from "./page/login/login.jsx";
import Chat from "./page/chat/chat.jsx";
import Payment from "./page/payment/payment.jsx";
import OAuthSuccess from "./page/login/OAuthSuccess.jsx";

import { lazy, Suspense } from "react";
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
        <Route path="/auth/oauth-success" element={<OAuthSuccess />} /> 
        <Route 
          path="/chat" 
          element={authUser ? <Chat /> : <Navigate to="/auth/login" />} 
        />
        <Route 
          path="/payment" 
          element={authUser ? <Payment /> : <Navigate to="/auth/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;

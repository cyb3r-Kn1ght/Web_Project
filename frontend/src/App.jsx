import Home from "./page/web_page/Home.jsx";
import Login from "./page/login/login.jsx";
import { lazy, Suspense } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Chat = lazy(() => import("./page/chat/chat.jsx"));
const Payment = lazy(() => import("./page/payment/payment.jsx"));
function App() {
  const { authUser } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={authUser ? <Navigate to="/chat" /> : <Login />} />
        <Suspense>
        <Route 
          path="/chat" 
          element={authUser ? <Chat /> : <Navigate to="/auth/login" />} 
        />
        <Route 
          path="/payment" 
          element={authUser ? <Payment /> : <Navigate to="/auth/login" />}
        />
        </Suspense>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;

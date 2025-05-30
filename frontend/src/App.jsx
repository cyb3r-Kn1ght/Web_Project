import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

// Lazy load
const Home = lazy(() => import("./page/web_page/Home.jsx"));
const Login = lazy(() => import("./page/login/login.jsx"));
const Chat = lazy(() => import("./page/chat/chat.jsx"));
const Payment = lazy(() => import("./page/payment/payment.jsx"));

function App() {
  const { authUser } = useAuthStore();

  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/login"
            element={authUser ? <Navigate to="/chat" /> : <Login />}
          />
          <Route
            path="/chat"
            element={authUser ? <Chat /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/payment"
            element={authUser ? <Payment /> : <Navigate to="/auth/login" />}
          />
        </Routes>
      </Suspense>

      <Toaster />
    </>
  );
}

export default App;

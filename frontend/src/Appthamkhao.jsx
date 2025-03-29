import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginApp from "./page/loginApp"; // giao diện login;
import ChatApp from "./page/chatApp"; // giao diện chat box;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={<LoginApp onLoginSuccess={handleLoginSuccess} />}
        />
        {/* Nếu chưa đăng nhập, cố gắng truy cập /chat sẽ chuyển hướng về /login */}
        <Route
          path="/chat"
          element={
            isAuthenticated ? <ChatApp /> : <Navigate to="/auth/login" />
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/login/InputField";
import SocialLogin from "../components/login/SocialLogin";
import "../styles/login/index.css";

const LoginApp = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả sử bạn có kiểm tra hợp lệ dữ liệu nhập vào (email và password) ở đây.
    // Nếu hợp lệ:
    onLoginSuccess(); // cập nhật trạng thái đăng nhập
    navigate("/chat"); // chuyển hướng sang trang Chat
  };
  
  
  
  return (
    <div className="container">
      
      <div className="img-background"></div>

      <div className="right-container">
        <div className="login-bar">
          <h2 className="form-title">Login with </h2>
          <SocialLogin />
          <p className="separator"><span>or</span></p>

          <form onSubmit= {handleLogin} action="#" className="login-form">

          <InputField  type="email" placeholder="Email address" icon="mail"/>
          <InputField type="password" placeholder="Password" icon="key" />
              <a href="#" className="forget-pass-link">Forgot password?</a>
              <button className="login-button">Log In</button>
          </form>

          <p className="signup-text">Don't have an account? <a href="#">Sign up now</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginApp;

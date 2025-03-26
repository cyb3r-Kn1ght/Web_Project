import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/login/InputField";
import SocialLogin from "../components/login/SocialLogin";
import "../styles/login/index.css";
import { useAuthStore } from "../store/useAuthStore";

const LoginApp = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { LogIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả sử bạn có kiểm tra hợp lệ dữ liệu nhập vào (email và password) ở đây.
    // Nếu hợp lệ:
    //onLoginSuccess(); // cập nhật trạng thái đăng nhập
    //navigate("/chat"); // chuyển hướng sang trang Chat
    LogIn(formData);
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

          <InputField  
            type="email" 
            placeholder="Email address" 
            icon="mail"

            //hỗ trợ tính năng kiểm tra ở thời gian thực
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <InputField 
              type="password" 
              placeholder="Password" 
              icon="key"
              
              //hỗ trợ tính năng kiểm tra ở thời gian thực
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
              <a href="#" className="forget-pass-link">Forgot password?</a>
              <button className="login-button" onClick={handleLogin}>Log In</button>
          </form>

          <p className="signup-text">Don't have an account? <a href="#">Sign up now</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginApp;
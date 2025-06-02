// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initLoginHandlers } from "../../feature/login/login.js";
import GoogleIcon from "../../assets/login/google.svg";
import "../../style/login/login.css";
import Input_Field from "../../components/login/Input_Fields.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";

const Login = () => {
  const { LogIn, SignUp } = useAuthStore();
  const navigate = useNavigate();

  // === State cho Sign-in ===
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  // === State cho Sign-up ===
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [signUpError, setSignUpError] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    initLoginHandlers();

    // Sau khi DOM được render, đánh dấu event listeners để reset form
    // Khi click “Sign up” (đổi pane), xóa dữ liệu sign-in
    const signUpBtn = document.getElementById("sign-up-btn");
    const signInBtn = document.getElementById("sign-in-btn");

    const clearSignInForm = () => {
      setSignInData({ email: "", password: "" });
      setSignInError("");
    };
    const clearSignUpForm = () => {
      setSignUpData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setSignUpError("");
    };

    if (signUpBtn) signUpBtn.addEventListener("click", clearSignInForm);
    if (signInBtn) signInBtn.addEventListener("click", clearSignUpForm);

    // Cleanup khi component unmount hoặc re-render
    return () => {
      if (signUpBtn) signUpBtn.removeEventListener("click", clearSignInForm);
      if (signInBtn) signInBtn.removeEventListener("click", clearSignUpForm);
    };
  }, []);

  // --- Hàm thay đổi input cho Sign-in ---
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Submit Sign-in ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignInError("");

    const { email, password } = signInData;
    if (!email || !password) {
      setSignInError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setSignInLoading(true);
    try {
      const user = await LogIn({ email, password });
      setSignInLoading(false);
      if (user) {
        navigate("/chat");
      } else {
        setSignInError("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setSignInLoading(false);
      setSignInError("Có lỗi xảy ra, vui lòng thử lại");
      console.error(err);
    }
  };

  // --- Hàm thay đổi input cho Sign-up ---
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));

    // Kiểm tra ngay khi nhập confirmPassword hoặc password
    if (name === "confirmPassword") {
      if (value && value !== signUpData.password) {
        setSignUpError("Mật khẩu xác nhận không khớp");
        return;
      } else {
        setSignUpError("");
      }
    }
    if (name === "password") {
      if (signUpData.confirmPassword && value !== signUpData.confirmPassword) {
        setSignUpError("Mật khẩu xác nhận không khớp");
        return;
      } else {
        setSignUpError("");
      }
    }
    setSignUpError("");
  };

  // --- Submit Sign-up ---
  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError("");

    const { username, email, password, confirmPassword } = signUpData;
    
    if (!username || !email || !password || !confirmPassword) {
      setSignUpError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      setSignUpError("Mật khẩu xác nhận không khớp");
      return;
    }

    setSignUpLoading(true);
    try {
      const user = await SignUp({ username, email, password });
      setSignUpLoading(false);
      if (user) {
        navigate("/auth/login");
      } else {
        setSignUpError("Đăng ký thất bại, vui lòng thử lại");
      }
    } catch (err) {
      setSignUpLoading(false);
      setSignUpError("Có lỗi xảy ra, vui lòng thử lại");
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* ===== Form Sign-in ===== */}
            <form
              action="#"
              className="sign-in-form"
              onSubmit={handleSubmit}
            >
              <h2 className="title">Sign in</h2>

              <Input_Field
                name="email"
                icon="mail"
                type="email"
                placeholder="Email"
                value={signInData.email}
                onChange={handleSignInChange}
              />

              <Input_Field
                name="password"
                icon="key"
                type="password"
                placeholder="Password"
                value={signInData.password}
                onChange={handleSignInChange}
              />

              {signInError && (
                <div className="form-error" style={{ color: "red", marginTop: "4px" }}>
                  {signInError}
                </div>
              )}

              <input
                type="submit"
                value={signInLoading ? "Đang xử lý..." : "Login"}
                className="btn solid"
                disabled={signInLoading}
              />

              <a href="/forgot-password">Forgot password?</a>
              <p className="social-text">
                Or sign in with social platforms
              </p>
              <div className="social-media">
                <a
                  href="https://celebritychatbot.up.railway.app/api/auth/google"
                  className="social-icon"
                >
                  <img
                    src={GoogleIcon}
                    alt="GoogleIcon"
                    className="icon-google"
                  />
                </a>
              
              </div>
            </form>

            {/* ===== Form Sign-up ===== */}
            <form className="sign-up-form" onSubmit={handleSignUp}>
              <h2 className="title">Sign up</h2>

              <Input_Field
                name="username"
                icon="account_circle"
                type="text"
                placeholder="Username"
                value={signUpData.username}
                onChange={handleSignUpChange}
              />

              <Input_Field
                name="email"
                icon="mail"
                type="email"
                placeholder="Email"
                value={signUpData.email}
                onChange={handleSignUpChange}
              />

              <Input_Field
                name="password"
                icon="key"
                type="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={handleSignUpChange}
              />

              <Input_Field
                name="confirmPassword"
                icon="verified_user"
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
              />

              {signUpError && (
                <div className="form-error" style={{ color: "red", marginTop: "4px" }}>
                  {signUpError}
                </div>
              )}

              <input
                type="submit"
                className="btn"
                value={signUpLoading ? "Đang xử lý..." : "Sign up"}
                disabled={signUpLoading}
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Create account to chat with me!</p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Welcome back!</p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

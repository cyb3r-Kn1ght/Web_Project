import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { initLoginHandlers } from "../../feature/login/login.js";
import GoogleIcon from "../../assets/login/google.svg";
import FacebookIcon from "../../assets/login/facebook.svg";
import "../../style/login/login.css";
import Input_Field from "../../components/login/Input_Fields.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { axiosInstance } from "../../lib/axios.js";

const Login = () => {
  const { LogIn } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi hàm chuyển cảnh sau khi component render xong
    initLoginHandlers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = await LogIn(formData);
    console.log(user);
    if (user) {
      navigate("/chat"); // chuyển hướng sang trang chat
    }

    //   // Gửi request POST đến endpoint /login của server
    //   const response = await axiosInstance.post("/login", {
    //     username,
    //     password,
    //   });

    //   // Giả sử server trả về { success: true, user: {...} } khi đăng nhập thành công
    //   if (response.data.success) {
    //     // Lưu thông tin phiên làm việc, ví dụ: lưu vào localStorage hoặc Context
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //     // Chuyển hướng đến trang chatbox hoặc trang chính của ứng dụng
    //     navigate("/chatbox");
    //   } else {
    //     setError(response.data.message || "Đăng nhập thất bại!");
    //   }
    // } catch (err) {
    //   setError("Có lỗi xảy ra, vui lòng thử lại!");
    //   console.error(err);
    // }
  };

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>

              {/* su dung component vao thuc te */}
              <Input_Field
                icon="mail"
                type="email"
                placeholder="Email"
                value={formData.email} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input_Field
                icon="key"
                type="password"
                placeholder="Password"
                value={formData.password} // doan nay can BE check lai
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <p className="forget-password">
                {/* Forget password <Link to="/forgot-password">click here!</Link> */}
              </p>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or sign in with social platforms</p>
              <div className="social-media">
                <a
                  href="http://localhost:3001/api/auth/facebook"
                  className="social-icon"
                >
                  <img
                    src={FacebookIcon}
                    alt="FacebookIcon"
                    className="icon-facebook"
                  />
                </a>

                <a
                  href="http://localhost:3001/api/auth/google"
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

            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>

              <Input_Field
                icon="account_circle"
                type="text"
                placeholder="Username"
                value={formData.username} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <Input_Field
                icon="mail"
                type="email"
                placeholder="Email"
                value={formData.email} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input_Field
                icon="key"
                type="password"
                placeholder="Password"
                value={formData.password} // doan nay can BE check lai
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Input_Field
                icon="verified_user"
                type="password"
                placeholder="Confirm Password"
                value={formData.password} // doan nay can BE check lai
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <img
                    src={FacebookIcon}
                    alt="FacebookIcon"
                    className="icon-facebook"
                  />
                </a>

                <a href="#" className="social-icon">
                  <img
                    src={GoogleIcon}
                    alt="GoogleIcon"
                    className="icon-google"
                  />
                </a>
              </div>
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
            <img src="img/log.svg" className="image" alt="" />
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

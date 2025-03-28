import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { initLoginHandlers } from "../feature/login/login.js";
import GoogleIcon from "../assets/login/google.svg";
import FacebookIcon from "../assets/login/facebook.svg";
import "../style/login/login.css";
import Input_Field from "../components/login/Input_Fields.jsx";
function Login() {
  useEffect(() => {
    // Gọi hàm chuyển cảnh sau khi component render xong
    initLoginHandlers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>

              {/* su dung component vao thuc te */}
              <Input_Field
                icon="mail"
                type="email"
                placeholder="Email"
                // value={formData.email} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                // onChange={(e) =>
                //   setFormData({ ...formData, email: e.target.value })
                // }
              />

              <Input_Field
                icon="key"
                type="password"
                placeholder="Password"
                // value={formData.password} // doan nay can BE check lai
                // onChange={(e) =>
                //   setFormData({ ...formData, password: e.target.value })
                // }
              />

              <p className="forget-password">
                {/* Forget password <Link to="/forgot-password">click here!</Link> */}
              </p>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or sign in with social platforms</p>
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

            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>

              <Input_Field
                icon="account_circle"
                type="text"
                placeholder="Username"
                // value={formData.username} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                // onChange={(e) =>
                //   setFormData({ ...formData, username: e.target.value })
                // }
              />

              <Input_Field
                icon="mail"
                type="email"
                placeholder="Email"
                // value={formData.email} // doan nay can BE check lai, thieu gi do ma web k chay dc tam thoi bo comment
                // onChange={(e) =>
                //   setFormData({ ...formData, email: e.target.value })
                // }
              />

              <Input_Field
                icon="key"
                type="password"
                placeholder="Password"
                // value={formData.password} // doan nay can BE check lai
                // onChange={(e) =>
                //   setFormData({ ...formData, password: e.target.value })
                // }
              />

              <Input_Field
                icon="verified_user"
                type="password"
                placeholder="Confirm Password"
                // value={formData.password} // doan nay can BE check lai
                // onChange={(e) =>
                //   setFormData({ ...formData, password: e.target.value })
                // }
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
}

export default Login;

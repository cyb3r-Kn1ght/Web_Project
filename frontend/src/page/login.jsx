import React, { useEffect } from "react";
import { initLoginHandlers } from "../feature/login/login.js";
import GoogleIcon from "../assets/login/google.svg";
import FacebookIcon from "../assets/login/facebook.svg";
import "../style/login/login.css";
function App() {
  useEffect(() => {
    // Gọi hàm chuyển cảnh sau khi component render xong
    initLoginHandlers();
  }, []);

  return (
    <>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" class="btn solid" />
              <p class="social-text">Or sign in with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <img
                    src={FacebookIcon}
                    alt="FacebookIcon"
                    className="icon-facebook"
                  />
                </a>

                <a href="#" class="social-icon">
                  <img
                    src={GoogleIcon}
                    alt="GoogleIcon"
                    className="icon-google"
                  />
                </a>
              </div>
            </form>
            <form action="#" class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" class="btn" value="Sign up" />
              <p class="social-text">Or sign up with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <img
                    src={FacebookIcon}
                    alt="FacebookIcon"
                    className="icon-facebook"
                  />
                </a>

                <a href="#" class="social-icon">
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

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>Create account to chat with me!</p>
              <button class="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="img/log.svg" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>Welcome back!</p>
              <button class="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

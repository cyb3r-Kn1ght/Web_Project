import React, { useEffect } from 'react';
import './Login.css';
import GoogleIcon from './assets/google.svg'
import FacebookIcon from './assets/facebook.svg'
import { initLoginHandlers } from './login.js';
function Login() {
  useEffect(() => {
    initLoginHandlers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                {/* chen anh vao field */}
                <i className="material-symbols-outlined">mail</i>
                <input type="text" placeholder="Email"/>
              </div>
              <div className="input-field">
                <i className="material-symbols-outlined">key</i>
                <input type="password" placeholder="Password"/>
              </div>
              <input type="submit" value="Login" className="login-button"/>
              <p className="social-text">Or sign in withe social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <img src={FacebookIcon} alt="FacebookIcon" className="icon-facebook" />
                </a>
                <a href="#" className="social-icon">
                  <img src={GoogleIcon} alt="GoogleIcon" className="icon-google" />
                </a>
              </div>
            </form>

            <form action="" className="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                {/* chen anh vao field */}
                <i class="material-symbols-outlined">&#xE853;</i>
                <input type="text" placeholder="Username"/>
              </div>
              <div className="input-field">
                {/* chen anh vao field */}
                <i className="material-symbols-outlined">mail</i>
                <input type="text" placeholder="Email"/>
              </div>
              <div className="input-field">
                <i className="material-symbols-outlined">key</i>
                <input type="password" placeholder="Password"/>
              </div>
              <input type="submit" value="Sign Up" className="login-button"/>
              <p className="social-text">Or sign in withe social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <img src={FacebookIcon} alt="FacebookIcon" className="icon-facebook" />
                </a>
                <a href="#" className="social-icon">
                  <img src={GoogleIcon} alt="GoogleIcon" className="icon-google" />
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Create account and chat with me!</p>
              <button className="button-tranform" id="sign-up-button">Sign Up</button>
            </div>
           
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>Welcome back!</p>
              <button className="button-tranform" id="sign-in-button">Sign In</button>
            </div>
          
          </div>

        </div>
      </div>
    </>
  );
}


export default Login

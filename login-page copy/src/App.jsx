
const App = () => {
  return (
    <div className="container">
      
      <div className="img-background"></div>

      <div className="right-container">
        <div className="login-bar">
          <h2 className="form-title">Login with </h2>
          <div className="social-login">
            <button className="social-button">
              <img src="google.svg" alt="Google icon" className="social-img" />
            Google
            </button>

            <button className="social-button">
              <img src="facebook.png" alt="Facebook icon" className="social-img" />
            Facebook
            </button>
          </div>
          <p className="separator"><span>or</span></p>

          <form action="#" className="login-form">
              <div className="input-wrapper">
                  <input type="email" placeholder="Email address" className="input-field" required/>
                  <i className="material-symbols-outlined"> mail </i>
              </div>

              <div className="input-wrapper">
                  <input type="password" placeholder="Password" className="input-field" required/>
                  <i className="material-symbols-outlined"> key </i>
              </div>
              <a href="#" className="forget-pass-link">Forgot password?</a>
              <button className="login-button">Log In</button>
          </form>

          <p className="signup-text">Don't have an account? <a href="#">Signup now</a></p>
        </div>
      </div>

    </div>
  )
}

export default App
import React from 'react';
import googleIcon from '../../assets/images/google.svg';
import facebookIcon from '../../assets/images/facebook.png';
const SocialLogin = () => {
    return (
        <div className="social-login">
            <button className="social-button">
              <img src= {googleIcon} alt="Google icon" className="social-img" />
            Google
            </button>

            <button className="social-button">
              <img src={facebookIcon} alt="Facebook icon" className="social-img" />
            Facebook
            </button>
        </div>
    )

}

export default SocialLogin
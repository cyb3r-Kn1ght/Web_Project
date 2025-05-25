import React from "react";
import "../../style/web_page/footer.css";

const footer = () => {
  const currentYear = new Date().getFullYear();
  {
    /* Chưa link bất cứ trang nào */
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="mailto:ndtnetdautruong@gmail.com">Contact: ndtnetdautruong@gmail.com</a>

            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>
              <a href="/services">Our Services</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/cookies">Cookie Policy</a>
            </li>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Group 4 NT208.P22.ANTT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default footer;

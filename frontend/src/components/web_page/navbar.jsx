import { useState, useEffect } from "react";
import "../../style/web_page/navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo-text">AI ChatBot</div>
      <div className="nav-links">
        <Link to="/auth/login" className="api-link">
          Login↗
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;

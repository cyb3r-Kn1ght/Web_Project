import { useState, useEffect } from "react";
import "../../style/web_page/navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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

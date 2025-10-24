import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "active" : "hidden"}`}>
      <div className="logo">CivicConnect</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            {user?.role === "ADMIN" && <li><Link to="/admin">Case Status</Link></li>}
            {user?.role !== "ADMIN" && <li><Link to="/addcase">Add Case</Link></li>}
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

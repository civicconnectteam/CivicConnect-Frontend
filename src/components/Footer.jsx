import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CivicConnect. All rights reserved.</p>
          <div className="bottom-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
      </div>
      </div>

    </footer>
  );
};

export default Footer;

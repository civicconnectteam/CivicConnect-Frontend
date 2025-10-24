import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-card">
        <h2>Reach Out</h2>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:civicconnectteam@gmail.com" className="contact-link">
              civicconnectteam@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;

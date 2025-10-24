import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About CivicConnect</h1>
      <div className="about-card">
        <h2>Our Mission</h2>
        <ul>
          <li>Provide real-time tracking of complaints</li>
          <li>Ensure transparent updates with resolution notes</li>
          <li>Enable easy image upload and location tagging</li>
          <li>Offer mobile-friendly interface for on-the-go reporting</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <div className="privacy-card">
        <h2>Your Data Matters</h2>
        <ul>
          <li>All user data is securely stored and encrypted.</li>
          <li>We do not share personal information with third parties.</li>
          <li>Complaint history and profile information is confidential.</li>
          <li>Users can request data deletion at any time.</li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;

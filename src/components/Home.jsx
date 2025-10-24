import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Citizen Complaint Portal</h1>
      <p>Easily register, file complaints, and track their progress online.</p>

      <div className="dashboard-sections">
        <section className="dashboard-card">
          <h2>Citizen</h2>
          <ul>
            <li>Registers and logs in securely.</li>
            <li>Files a complaint (e.g., “Streetlight not working in Ward 12”).</li>
            <li>Uploads images and specifies location.</li>
            <li>Tracks complaint status (“Pending”, “In Progress”, “Resolved”).</li>
          </ul>
        </section>

        <section className="dashboard-card">
          <h2>Admin Overview</h2>
          <ul>
            <li>Monitors all user-submitted complaints.</li>
            <li>Updates complaint statuses and adds reviews.</li>
            <li>Generates reports efficiently.</li>
          </ul>
        </section>

        <section className="dashboard-card">
          <h2>Quick Stats</h2>
          <ul>
            <li>Total Users: 120</li>
            <li>Complaints Submitted: 250</li>
            <li>Complaints Resolved: 180</li>
            <li>Pending Complaints: 70</li>
          </ul>
        </section>
      </div>

      {/* ================= New Cards ================= */}
      <div className="dashboard-sections">
        <section className="dashboard-card">
          <h2>Why Choose Our Portal?</h2>
          <ul>
            <li>Real-time tracking of complaints</li>
            <li>Transparent updates with resolution notes</li>
            <li>Easy image upload and location tagging</li>
            <li>Mobile-friendly interface for on-the-go reporting</li>
          </ul>
        </section>

        <section className="dashboard-card">
          <h2>Top Reported Issues</h2>
          <ul>
            <li>Garbage collection delays</li>
            <li>Broken streetlights</li>
            <li>Potholes & road damage</li>
            <li>Water leakage / pipeline issues</li>
            <li>Noise complaints</li>
          </ul>
        </section>

        <section className="dashboard-card">
          <h2>Citizen Testimonials</h2>
          <ul>
            <li>“Finally, I can track my complaint online without visiting the office.”</li>
            <li>“The team resolved my streetlight issue within 2 days. Highly recommended!”</li>
            <li>“Easy to use, and I get updates instantly. Makes civic issues less stressful.”</li>
          </ul>
        </section>
      </div>

      {/* ================= FAQ Card ================= */}
      <div className="faq-card">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li><strong>Q:</strong> How do I file a complaint? <br /><strong>A:</strong> Register/login and click "Add Complaint" to submit details and images.</li>
          <li><strong>Q:</strong> Can I track the complaint status? <br /><strong>A:</strong> Yes, all complaints can be tracked in your profile in real-time.</li>
          <li><strong>Q:</strong> Who resolves the complaints? <br /><strong>A:</strong> The local municipal team handles the resolution based on the issue type.</li>
          <li><strong>Q:</strong> Is my data secure? <br /><strong>A:</strong> Yes, your information is stored securely and used only for complaint management.</li>
        </ul>
      </div>

      
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await axios.post("https://civicconnect-backend-cn1d.onrender.com/api/auth/login", formData);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setIsLoggedIn(true);
        setMessage({ text: "✅ Login successful!", type: "success" });

        // ⏳ Delay for 2 seconds before redirecting
        setTimeout(() => {
          if (res.data.role === "ADMIN") navigate("/admin");
          else navigate("/profile");
          setLoading(false);
        }, 1250);
      } else {
        setMessage({ text: "❌ Invalid credentials.", type: "error" });
        setLoading(false);
      }
    } catch (err) {
      setMessage({ text: "❌ Login failed. Please try again.", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="signup-link">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up here</span>
      </p>

      {message.text && (
        <p className={`login-message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default Login;

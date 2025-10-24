import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = ({ setIsLoggedIn, setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false); // for button state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8082/api/user/register",
        formData
      );

      if (res.data) {
        setMessage({ text: "Signup successful!", type: "success" });
        setIsLoggedIn(true);
        setUser(res.data);

        // simulate 1-2 sec delay before navigating
        setTimeout(() => {
          if (res.data.role === "ADMIN") navigate("/admin");
          else navigate("/profile");
        }, 1500);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage({ text: "Email already used. Please use another.", type: "error" });
      } else {
        setMessage({ text: "Signup failed! Please try again.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
       {/* Select wrapper for custom arrow */}
        <div className="select-wrapper">
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Login Link */}
      <p className="login-redirect">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </p>

      {/* Message */}
      {message.text && (
        <div className={`signup-message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Signup;

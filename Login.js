import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import Google icon
import "../styles/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoogleLogin = () => {
    console.log("Google login successful");
    onLogin(); // Update login state
    navigate("/homepage"); // Redirect to HomePage
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("Email login successful");
      console.log("Email:", email, "Password:", password);
      onLogin(); // Update login state
      navigate("/homepage"); // Redirect to HomePage
    } else {
      alert("Please enter both email and password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to JustTap</h1>
        <p>Connect and chat seamlessly with your friends.</p>

        {/* Google Login */}
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} size="1x" /> {/* Google Icon */}
          &nbsp; &nbsp;Sign in with Google
        </button>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Email and Password Login */}
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label htmlFor="email">Enter Your Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Your Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="email-login-button">
            Login with Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle the click event for 'Get Started' button
  const handleGetStarted = () => {
    navigate("/chatwindow"); // Navigate to ChatWindow
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">Welcome to JustTap 💬</h1>
        <p className="home-subtitle">
          Connect and chat seamlessly with your friends.
        </p>
        <div className="home-actions">
          <button 
            className="home-button"
            onClick={handleGetStarted} // Trigger navigation
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import "../styles/LogoutPage.css";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    handleLogout(); // Set isLoggedIn to false when logout page loads
    setIsLoggedOut(true);
  }, [handleLogout]);

  return (
    <div className="logout-page">
      <div className="logout-container">
        <h1 className="logout-title">You’ve Successfully Logged Out 🚪</h1>
        <p className="logout-message">
          Thank you for visiting! We hope to see you again soon.
        </p>
        <button className="logout-button" onClick={() => navigate("/")}>
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;

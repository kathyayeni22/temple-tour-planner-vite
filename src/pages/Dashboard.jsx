import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">🛕 Welcome to Aaradhak Dashboard</h1>
      <p className="dashboard-text">
        Your spiritual journey begins here. Plan your temple tours effortlessly.
      </p>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/top-temples")}>
          <img src="/top-temples.png" alt="Top Temples" className="card-img" />
          <h3>Top Temples</h3>
        </div>

        <div className="card" onClick={() => navigate("/plan-tour")}>
          <img src="/plan-tour.png" alt="Plan Tour" className="card-img" />
          <h3>Plan Your Tour</h3>
        </div>

        <div className="card" onClick={() => navigate("/bookings")}>
          <img src="/bookings.png" alt="Bookings" className="card-img" />
          <h3>My Bookings</h3>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

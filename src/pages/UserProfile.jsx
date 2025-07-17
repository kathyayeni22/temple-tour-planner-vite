// src/pages/UserProfile.jsx
import React from "react";
import "./UserProfile.css";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <h2 className="profile-heading">👤 User Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}

export default UserProfile;

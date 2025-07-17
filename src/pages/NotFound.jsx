import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>🚫 Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={handleGoBack}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6a1b9a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🔙 Go Back
      </button>
    </div>
  );
}

export default NotFound;

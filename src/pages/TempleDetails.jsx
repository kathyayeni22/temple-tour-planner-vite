// src/pages/TempleDetails.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { templeData } from "../data/templeData";
import "./TempleDetails.css";

const TempleDetails = () => {
  const { slug } = useParams();
  const [selectedSubTemple, setSelectedSubTemple] = useState(null);

  const selectedTemple = templeData.find(
    (t) => t.slug === slug
  );

  const handleAddToPlan = (temple) => {
    const existingPlan = JSON.parse(localStorage.getItem("plannedTemples")) || [];
    const alreadyAdded = existingPlan.some((t) => t.name === temple.name);

    if (!alreadyAdded) {
      existingPlan.push(temple);
      localStorage.setItem("plannedTemples", JSON.stringify(existingPlan));
      alert(`${temple.name} added to your tour plan!`);
    } else {
      alert(`${temple.name} is already in your plan.`);
    }
  };

  if (!selectedTemple) return <h2>Temple not found</h2>;

  return (
    <div className="temple-details-container">
      <h2>{selectedTemple.name}</h2>
      <p>{selectedTemple.location}</p>

      <div className="temple-layout">
        <div className="temple-image-container">
          <img src={selectedTemple.image} alt={selectedTemple.name} />
        </div>

        <div className="bubble-section">
          <h3>Nearby Temples</h3>
          <div className="sub-temple-list">
            {selectedTemple.subTemples.map((sub, index) => (
              <div
                key={index}
                className="sub-temple-bubble"
                onClick={() => setSelectedSubTemple(sub)}
              >
                {sub.name}
                <span className="distance-tooltip">{sub.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSubTemple && (
        <div className="modal-overlay" onClick={() => setSelectedSubTemple(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedSubTemple.name}</h3>
            <img
              src={selectedSubTemple.image}
              alt={selectedSubTemple.name}
              className="modal-temple-image"
            />
            <p><strong>Distance:</strong> {selectedSubTemple.distance}</p>
            <p><strong>Significance:</strong> {selectedSubTemple.significance}</p>
            <p><strong>History:</strong> {selectedSubTemple.history}</p>

            <button
              className="add-to-plan-button"
              onClick={() => handleAddToPlan(selectedSubTemple)}
            >
              ➕ Add to My Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleDetails;

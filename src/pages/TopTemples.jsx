import React, { useState } from "react";
import { Link } from "react-router-dom";
import { templeData } from "../data/templeData";
import "./TopTemples.css";
import { addToPlan } from "../utils/planUtils";

const slugify = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

function TopTemples() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [radius, setRadius] = useState(20); // km

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredTemples = templeData.filter((temple) => {
    const query = searchQuery.toLowerCase();

    const matchSearch =
      temple.name.toLowerCase().includes(query) ||
      temple.location.toLowerCase().includes(query) ||
      (temple.category &&
        temple.category.some((cat) => cat.toLowerCase().includes(query)));

    const matchFilter =
      filterType === "all" ||
      (filterType === "jyotirlinga" &&
        temple.category.includes("Jyotirlingas")) ||
      (filterType === "shakti-peetha" &&
        temple.category.includes("Shakti Peethas")) ||
      (filterType === "state" &&
        !["Jyotirlingas", "Shakti Peethas"].includes(temple.category[0]));

    return matchSearch && matchFilter;
  });

  return (
    <div className="top-temples-container">
      <h2 className="temples-heading">🛕 Top Temples in India</h2>

      {/* 🔍 Search and Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search by name, location, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="temple-search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="temple-filter-dropdown"
        >
          <option value="all">All</option>
          <option value="jyotirlinga">Jyotirlingas</option>
          <option value="shakti-peetha">Shakti Peethas</option>
          <option value="state">State/Location</option>
        </select>

        {/* 🌐 Radius Filter */}
        <div className="radius-filter">
          <label>Radius (km): </label>
          <input
            type="range"
            min="1"
            max="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <span>{radius} km</span>
        </div>
      </div>

      {/* 🛕 Temple Cards */}
      <div className="temple-cards">
        {filteredTemples.map((temple, index) => {
          const nearbySubTemples = temple.subTemples.filter((sub) => {
            const dist = getDistance(
              temple.latitude,
              temple.longitude,
              sub.latitude,
              sub.longitude
            );
            return dist <= radius;
          });

          return (
            <div key={index} className="temple-card">
              <img
                src={temple.image}
                alt={temple.name}
                className="temple-image"
                onError={(e) => {
                  e.target.src = "/temples/fallback.jpg"; // Optional fallback
                }}
              />
              <h3>{temple.name}</h3>
              <p>{temple.location}</p>

              <button onClick={() => addToPlan(temple)} className="add-btn">
                ➕ Add
              </button>

              {/* 🌟 Show filtered nearby sub-temples */}
              {nearbySubTemples.length > 0 && (
                <div className="sub-temples-preview">
                  <strong>Nearby Temples (within {radius} km):</strong>
                  <ul>
                    {nearbySubTemples.map((sub, i) => (
                      <li key={i}>
                        {sub.name} ({sub.distance})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/temples/${slugify(temple.name)}`}
                className="view-link"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopTemples;

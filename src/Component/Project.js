

import { useState } from "react";

// ✅ Images (same Assets use karo)
import duct1 from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
import duct2 from "../Assets/Rectangular G.I Duct.png";
import insulation1 from "../Assets/Insulation Work.jpg";
import insulation2 from "../Assets/Steam Pipe Insulation.png";
import hvac1 from "../Assets/as3.jpg";
import hvac2 from "../Assets/as7.jpg";

// ✅ Projects Data
const projectsData = [
  {
    id: 1,
    name: "GI Duct Installation",
    category: "Ducting",
    location: "Pharma Plant",
    image: duct1,
  },
  {
    id: 2,
    name: "Rectangular Duct Work",
    category: "Ducting",
    location: "Industrial Unit",
    image: duct2,
  },
  {
    id: 3,
    name: "Thermal Insulation Work",
    category: "Insulation",
    location: "Chemical Plant",
    image: insulation1,
  },
  {
    id: 4,
    name: "Steam Pipe Insulation",
    category: "Insulation",
    location: "Boiler Area",
    image: insulation2,
  },
  {
    id: 5,
    name: "HVAC Installation",
    category: "HVAC",
    location: "Commercial Building",
    image: hvac1,
  },
  {
    id: 6,
    name: "Ventilation System",
    category: "HVAC",
    location: "Factory",
    image: hvac2,
  },
];

export default function OurProjects() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);

  const categories = ["All", "Ducting", "Insulation", "HVAC"];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <div
      style={{
        padding: "60px 30px",
        background: "#f7f7f7",
        fontFamily: "Segoe UI",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p style={{ letterSpacing: "3px", fontSize: "12px", color: "#888" }}>
          OUR PROJECTS
        </p>
        <h2 style={{ fontSize: "34px", fontWeight: "400" }}>
          HVAC Project Portfolio
        </h2>
      </div>

      {/* Filters */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              margin: "5px",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              background: filter === cat ? "#000" : "#ddd",
              color: filter === cat ? "#fff" : "#000",
              borderRadius: "20px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
                transition: "0.5s",
                transform:
                  hovered === p.id ? "scale(1.08)" : "scale(1)",
              }}
            />

            {/* Overlay */}
            {hovered === p.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "15px",
                }}
              >
                <h4 style={{ margin: 0 }}>{p.name}</h4>
                <p style={{ margin: 0, fontSize: "13px" }}>
                  {p.location}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

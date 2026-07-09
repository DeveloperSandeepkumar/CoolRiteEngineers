import React, { useState } from "react";

// ✅ Images
import mainImg from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
import soundProof from "../Assets/Sound Proof Insulation.jpg";
import steamBoiler from "../Assets/Steam Boiler Insulation Work.png";
import steamPipe from "../Assets/Steam Pipe Insulation.png";
import thermoPipe from "../Assets/Thermocouple Pipe Section Insulation Work.jpg";

import as2 from "../Assets/as2.jpg";
import as3 from "../Assets/as3.jpg";
import as4 from "../Assets/as4.jpg";
import as5 from "../Assets/as5.jpg";
import as6 from "../Assets/as6.jpg";
import as7 from "../Assets/as7.jpg";
import as8 from "../Assets/as8.jpg";
import as9 from "../Assets/as9.jpg";
import as10 from "../Assets/as10.jpg";
import as11 from "../Assets/as11.jpg";
import as12 from "../Assets/as12.jpg";

// ✅ Products
const products = [
  { id: 1, name: "GI Duct Manufacturing", image: mainImg, alt: "Galvanised Iron GI Duct manufacturing for commercial HVAC systems" },
  { id: 2, name: "Sound Proof Insulation", image: soundProof, alt: "Acoustic and soundproof insulation services for HVAC ducts" },
  { id: 3, name: "Steam Boiler Insulation", image: steamBoiler, alt: "Thermal steam boiler insulation contracting services" },
  { id: 4, name: "Steam Pipeline Insulation", image: steamPipe, alt: "High temperature steam pipeline insulation cladding work" },
  { id: 5, name: "Thermocouple Pipe Insulation", image: thermoPipe, alt: "Thermocouple pipe section insulation and cladding engineering" },
  { id: 6, name: "Duct Fabrication", image: as2, alt: "Custom HVAC sheet metal duct fabrication at site" },
  { id: 7, name: "Duct Installation", image: as3, alt: "Industrial AC duct installation and air distribution setup" },
  { id: 8, name: "Duct Bending Work", image: as4, alt: "Precision sheet metal duct bending and forming services" },
  { id: 9, name: "Duct Assembly", image: as5, alt: "HVAC rectangular duct assembling and joint sealing" },
  { id: 10, name: "Air Flow System", image: as6, alt: "Centralized air distribution and flow management system" },
  { id: 11, name: "Ventilation System", image: as7, alt: "Industrial mechanical ventilation and smoke extract system" },
  { id: 12, name: "Industrial Ducting", image: as8, alt: "Heavy duty industrial ducting solutions for manufacturing plants" },
  { id: 13, name: "Site Installation", image: as9, alt: "MEP site installation of HVAC units and chilled water lines" },
  { id: 14, name: "Completed Project", image: as10, alt: "Finished commercial VRV air conditioning project handover" },
  { id: 15, name: "Commercial HVAC Work", image: as11, alt: "Large scale commercial HVAC chiller and piping installation" },
  { id: 16, name: "Final Installation", image: as12, alt: "Final testing and commissioning of cleanroom HVAC systems" },
];

export default function OurProduct() {
  const [hovered, setHovered] = useState(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-slate)",
        fontFamily: "'Outfit', sans-serif",
        padding: "60px 20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "4px",
            color: "var(--hvac-blue)",
            textTransform: "uppercase",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Our Offerings
        </p>

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "var(--primary-navy)",
            margin: "0",
          }}
        >
          HVAC & MEP Solutions
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "15px", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
          Explore our range of premium quality manufactured ducting, industrial insulation, and custom MEP engineering products.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "var(--card-bg)",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform var(--transition-normal), box-shadow var(--transition-normal)",
              boxShadow:
                hovered === p.id
                  ? "var(--shadow-xl)"
                  : "var(--shadow-md)",
              transform:
                hovered === p.id ? "translateY(-6px)" : "translateY(0)",
              border: "1px solid var(--border-color)",
            }}
          >
            {/* Image Container */}
            <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
              <img
                src={p.image}
                alt={p.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform:
                    hovered === p.id ? "scale(1.06)" : "scale(1)",
                }}
              />

              {/* Hover Text Reveal */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "linear-gradient(to top, rgba(11, 25, 44, 0.9), rgba(11, 25, 44, 0.4))",
                  color: "#fff",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  transition: "opacity var(--transition-fast)",
                  opacity: hovered === p.id ? 1 : 0.9,
                }}
              >
                {p.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

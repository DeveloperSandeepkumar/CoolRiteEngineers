import { useState } from "react";

// ✅ ONLY EXISTING IMAGES (repo ke according)
import mainImg from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
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

import soundProof from "../Assets/Sound Proof Insulation.jpg";
import steamBoiler from "../Assets/Steam Boiler Insulation Work.png";
import steamPipe from "../Assets/Steam Pipe Insulation.png";
import thermoPipe from "../Assets/Thermocouple Pipe Section Insulation Work.jpg";

// ✅ FILTERED PRODUCTS (same structure, only valid images)
const products = [
  { id: 1, name: "GI Duct Main", image: mainImg },

  { id: 2, name: "Sound Proof Insulation", image: soundProof },
  { id: 3, name: "Steam Boiler Insulation", image: steamBoiler },
  { id: 4, name: "Steam Pipe Insulation", image: steamPipe },
  { id: 5, name: "Thermocouple Pipe Insulation", image: thermoPipe },

  { id: 6, name: "Duct Fabrication", image: as2 },
  { id: 7, name: "Duct Installation", image: as3 },
  { id: 8, name: "Duct Bending", image: as4 },
  { id: 9, name: "Duct Assembly", image: as5 },
  { id: 10, name: "Air Flow System", image: as6 },
  { id: 11, name: "Ventilation Work", image: as7 },
  { id: 12, name: "Industrial Duct", image: as8 },
  { id: 13, name: "Site Work", image: as9 },
  { id: 14, name: "Finished Project", image: as10 },
  { id: 15, name: "Commercial HVAC", image: as11 },
  { id: 16, name: "Final Installation", image: as12 },
];

export default function OurProduct() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f3",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "60px 40px",
    }}>
      
      {/* Header same */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{
          fontSize: "11px",
          letterSpacing: "4px",
          color: "#999",
          textTransform: "uppercase",
        }}>
          Our Products
        </p>

        <h1 style={{
          fontSize: "36px",
          fontWeight: "300",
          color: "#1a1a1a",
        }}>
          HVAC Solutions
        </h1>
      </div>

      {/* Grid same */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {products.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "#fff",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: hovered === p.id
                ? "0 20px 60px rgba(0,0,0,0.12)"
                : "0 2px 16px rgba(0,0,0,0.06)",
              transform: hovered === p.id ? "translateY(-6px)" : "none",
            }}
          >
            <div style={{ height: "220px", overflow: "hidden" }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}>
              <span>{p.name}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

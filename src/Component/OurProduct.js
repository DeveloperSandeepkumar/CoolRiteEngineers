
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Split AC Unit",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
  },
  {
    id: 2,
    name: "Cassette AC",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
  },
  {
    id: 3,
    name: "Duct System",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: 4,
    name: "Heat Pump",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    id: 5,
    name: "Air Handler",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=400&q=80",
  },
  {
    id: 6,
    name: "Ventilation Unit",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  },
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <p style={{
          fontSize: "11px", letterSpacing: "4px", color: "#999",
          textTransform: "uppercase", marginBottom: "12px",
        }}>
          Our Products
        </p>
        <h1 style={{
          fontSize: "36px", fontWeight: "300", color: "#1a1a1a",
          letterSpacing: "-1px", margin: 0,
        }}>
          HVAC Solutions
        </h1>
        <div style={{
          width: "40px", height: "2px", background: "#1a1a1a",
          margin: "16px auto 0",
        }} />
      </div>

      {/* Cards Grid */}
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
              transition: "box-shadow 0.3s, transform 0.3s",
              boxShadow: hovered === p.id
                ? "0 20px 60px rgba(0,0,0,0.12)"
                : "0 2px 16px rgba(0,0,0,0.06)",
              transform: hovered === p.id ? "translateY(-6px)" : "translateY(0)",
            }}
          >
            {/* Image */}
            <div style={{
              width: "100%", height: "220px",
              overflow: "hidden", position: "relative",
            }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform: hovered === p.id ? "scale(1.06)" : "scale(1)",
                }}
              />
            </div>

            {/* Name */}
            <div style={{
              padding: "20px 24px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#1a1a1a",
                letterSpacing: "0.3px",
              }}>
                {p.name}
              </span>
              <span style={{
                fontSize: "18px",
                color: "#bbb",
                transition: "color 0.2s, transform 0.2s",
                transform: hovered === p.id ? "translateX(4px)" : "translateX(0)",
                display: "inline-block",
                color: hovered === p.id ? "#1a1a1a" : "#ccc",
              }}>
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

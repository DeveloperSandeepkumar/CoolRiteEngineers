import { useState } from "react";

// ✅ NEW IMAGES (TOP priority)
import soundAttenuator from "../Assets/sound-attenuator.jpg";
import steamBoiler from "../Assets/Steam Boiler Insulation Work.jpg";
import steamPipe from "../Assets/Steam Pipe Insulation.jpg";
import thermoPipe from "../Assets/Thermocouple Pipe Section Insulation Work.jpg";
import returnDamper from "../Assets/return-damber.jpg";
import sandTrap1 from "../Assets/sand-trap.jpg";
import sandTrap2 from "../Assets/sand-trap2-1-1.jpg";
import soundProof from "../Assets/Sound Proof Insulation.jpg";
import vcd1 from "../Assets/Volume-control-damper.jpg";
import vcd2 from "../Assets/Volume-control-damper2.jpg";
import vcd3 from "../Assets/Volume-control-damper3.jpg";
import vcd4 from "../Assets/Volume-control-damper4.jpg";
import preDuct1 from "../Assets/Pre-insulated-ducts.jpg";
import preDuct2 from "../Assets/Pre-insulated-ducts2.jpg";
import accessDoor from "../Assets/products-ac-spare-parts-accesdoor.jpg";
import airFilter1 from "../Assets/products-ac-spare-parts-air-filter.jpg";
import airFilter2 from "../Assets/products-ac-spare-parts-airfilters.jpg";

// ✅ OLD IMAGES
import mainImg from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
import as1 from "../Assets/as1.jpg";
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

// ✅ PRODUCTS LIST (NEW FIRST, OLD BELOW)
const products = [
  // 🔥 NEW PRODUCTS
  { id: 1, name: "Sound Attenuator", image: soundAttenuator },
  { id: 2, name: "Steam Boiler Insulation", image: steamBoiler },
  { id: 3, name: "Steam Pipe Insulation", image: steamPipe },
  { id: 4, name: "Thermocouple Pipe Insulation", image: thermoPipe },
  { id: 5, name: "Return Damper", image: returnDamper },
  { id: 6, name: "Sand Trap", image: sandTrap1 },
  { id: 7, name: "Sand Trap Type 2", image: sandTrap2 },
  { id: 8, name: "Sound Proof Insulation", image: soundProof },
  { id: 9, name: "Volume Control Damper", image: vcd1 },
  { id: 10, name: "VCD Type 2", image: vcd2 },
  { id: 11, name: "VCD Type 3", image: vcd3 },
  { id: 12, name: "VCD Type 4", image: vcd4 },
  { id: 13, name: "Pre Insulated Duct", image: preDuct1 },
  { id: 14, name: "Pre Insulated Duct 2", image: preDuct2 },
  { id: 15, name: "AC Access Door", image: accessDoor },
  { id: 16, name: "Air Filter", image: airFilter1 },
  { id: 17, name: "Air Filters Set", image: airFilter2 },

  // 🔽 OLD PRODUCTS
  { id: 18, name: "GI Duct Main", image: mainImg },
  { id: 19, name: "Duct Fabrication", image: as1 },
  { id: 20, name: "Duct Installation", image: as2 },
  { id: 21, name: "Duct Bending", image: as3 },
  { id: 22, name: "Duct Assembly", image: as4 },
  { id: 23, name: "Air Flow System", image: as5 },
  { id: 24, name: "Ventilation Work", image: as6 },
  { id: 25, name: "Industrial Duct", image: as7 },
  { id: 26, name: "Site Work", image: as8 },
  { id: 27, name: "Finished Project", image: as9 },
  { id: 28, name: "Air Distribution", image: as10 },
  { id: 29, name: "Commercial HVAC", image: as11 },
  { id: 30, name: "Final Installation", image: as12 },
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

        <div style={{
          width: "40px",
          height: "2px",
          background: "#1a1a1a",
          margin: "16px auto",
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {products.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "#fff",
              borderRadius: "6px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow:
                hovered === p.id
                  ? "0 20px 60px rgba(0,0,0,0.12)"
                  : "0 2px 16px rgba(0,0,0,0.06)",
              transform:
                hovered === p.id ? "translateY(-6px)" : "none",
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
                  transition: "0.5s",
                  transform:
                    hovered === p.id ? "scale(1.06)" : "scale(1)",
                }}
              />
            </div>

            <div style={{
              padding: "18px",
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

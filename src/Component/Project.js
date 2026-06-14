import React, { useState } from "react";

// ✅ Images
import duct1        from "../Assets/GI_DUCT_Manufacturing_Products.jpg";
import duct2        from "../Assets/Rectangular G.I Duct.png";
import insulation1  from "../Assets/Insulation Work.jpg";
import insulation2  from "../Assets/Steam Pipe Insulation.png";
import hvac1        from "../Assets/as3.jpg";
import hvac2        from "../Assets/as7.jpg";
import hvac3        from "../Assets/as5.jpg";
import hvac4        from "../Assets/as6.jpg";
import insulation3  from "../Assets/Hot & Cold Insulation Work.jpg";
import insulation4  from "../Assets/Armaflex Cold Insulation Work.jpg";
import duct3        from "../Assets/GI_DUCT_Manufacturing_Products2.jpg";
import insulation6  from "../Assets/Sound Proof Insulation.jpg";

// ✅ Customer Logos (for project cards)
import Cipla     from "../Assets/Cipla.png";
import Panacea   from "../Assets/Panacea.jpg";
import IndSwift  from "../Assets/IndSwift.png";
import LifeCare  from "../Assets/LifeCare.png";
import Hella     from "../Assets/Hella.jpg";
import FPCL      from "../Assets/FPCL.png";
import Growel    from "../Assets/Growel.png";
import Nector    from "../Assets/Nector.png";
import Allenger  from "../Assets/allenger.jpg";

// ✅ Projects Data (1 per customer + general)
const projectsData = [
  /* ─── CIPLA LTD. ────────────────────────────── */
  {
    id: 1,
    name: "GI Duct Installation — Cipla Cleanroom",
    category: "Ducting",
    client: "Cipla Ltd.",
    clientLogo: Cipla,
    year: "2022",
    description: "Supply & installation of GI rectangular ducts for pharmaceutical cleanroom HVAC system meeting GMP Grade-D standards.",
    image: duct1,
    alt: "GI duct installation at Cipla pharmaceutical cleanroom",
  },
  /* ─── PANACEA BIOTEC ─────────────────────────── */
  {
    id: 2,
    name: "HVAC System — Panacea Biotech",
    category: "HVAC",
    client: "Panacea Biotec",
    clientLogo: Panacea,
    year: "2023",
    description: "Complete HVAC installation including AHUs, cooling coils, and supply-return air duct network for injectable manufacturing block.",
    image: hvac1,
    alt: "Complete HVAC installation at Panacea Biotec pharmaceutical plant",
  },
  /* ─── IND-SWIFT LABS ─────────────────────────── */
  {
    id: 3,
    name: "Pipe Insulation — Ind-Swift Labs",
    category: "Insulation",
    client: "Ind-Swift Laboratories",
    clientLogo: IndSwift,
    year: "2023",
    description: "Cold pipeline insulation with Armaflex elastomeric foam for chilled water distribution network in production facility.",
    image: insulation4,
    alt: "Cold pipe insulation work at Ind-Swift Laboratories",
  },
  /* ─── LIFECARE INNOVATIONS ───────────────────── */
  {
    id: 4,
    name: "Rectangular Duct Work — LifeCare",
    category: "Ducting",
    client: "LifeCare Innovations",
    clientLogo: LifeCare,
    year: "2022",
    description: "Fabrication and installation of rectangular GI supply and return air ducts for hospital-grade cleanroom environment.",
    image: duct2,
    alt: "Rectangular GI duct fabrication for LifeCare Innovations clean room",
  },
  /* ─── HELLA INDIA ────────────────────────────── */
  {
    id: 5,
    name: "Industrial Ventilation — Hella India",
    category: "HVAC",
    client: "Hella India Lighting",
    clientLogo: Hella,
    year: "2021",
    description: "Mechanical ventilation system design and installation for automotive component production plant with heat & fume extraction.",
    image: hvac2,
    alt: "Industrial ventilation and fume extraction at Hella India automotive plant",
  },
  /* ─── FPCL ───────────────────────────────────── */
  {
    id: 6,
    name: "Steam Pipe Insulation — FPCL",
    category: "Insulation",
    client: "FPCL",
    clientLogo: FPCL,
    year: "2023",
    description: "High-temperature steam pipeline insulation with rockwool and aluminium cladding to minimise heat loss and improve plant efficiency.",
    image: insulation2,
    alt: "Steam pipe insulation with aluminium cladding at FPCL plant",
  },
  /* ─── GROWEL PHARMACEUTICALS ─────────────────── */
  {
    id: 7,
    name: "GI Duct Fabrication — Growel Pharma",
    category: "Ducting",
    client: "Growel Pharmaceuticals",
    clientLogo: Growel,
    year: "2022",
    description: "Custom GI duct manufacturing and installation for production block HVAC with precision air balancing for controlled environment.",
    image: duct3,
    alt: "GI duct fabrication for Growel Pharmaceuticals HVAC system",
  },
  /* ─── NECTAR LIFESCIENCES ────────────────────── */
  {
    id: 8,
    name: "Hot & Cold Insulation — Nectar",
    category: "Insulation",
    client: "Nectar Lifesciences",
    clientLogo: Nector,
    year: "2021",
    description: "Comprehensive hot and cold pipe insulation covering process water, chilled water, and steam lines across the manufacturing facility.",
    image: insulation3,
    alt: "Hot and cold pipe insulation at Nectar Lifesciences pharmaceutical plant",
  },
  /* ─── ALLENGERS MEDICAL ──────────────────────── */
  {
    id: 9,
    name: "Precision AC System — Allengers",
    category: "HVAC",
    client: "Allengers Medical Systems",
    clientLogo: Allenger,
    year: "2023",
    description: "Precision air conditioning installation for medical device R&D lab requiring temperature and humidity control within ±1°C tolerance.",
    image: hvac3,
    alt: "Precision air conditioning installation at Allengers Medical Systems",
  },
  /* ─── GENERAL PROJECTS ───────────────────────── */
  {
    id: 10,
    name: "Thermal Insulation Contract",
    category: "Insulation",
    client: "Chemical Process Plant",
    clientLogo: null,
    year: "2022",
    description: "Reactor and tank thermal insulation with high-density glass wool and weather-proof PU foam for outdoor process vessels.",
    image: insulation1,
    alt: "Reactor and tank thermal insulation at chemical process plant",
  },
  {
    id: 11,
    name: "Soundproof HVAC Enclosure",
    category: "HVAC",
    client: "Corporate Office",
    clientLogo: null,
    year: "2023",
    description: "Acoustic insulation enclosures for rooftop HVAC units to reduce noise emission below 45 dB at 1 metre distance.",
    image: insulation6,
    alt: "Soundproof HVAC acoustic insulation at corporate office",
  },
  {
    id: 12,
    name: "Multi-Floor Duct Network",
    category: "Ducting",
    client: "Heavy Industry Factory",
    clientLogo: null,
    year: "2021",
    description: "Multi-storey GI supply and exhaust duct network for heavy industrial manufacturing with integrated fire dampers and inspection doors.",
    image: hvac4,
    alt: "Multi-floor GI duct network installation heavy manufacturing plant",
  },
];

// ─── Category filter list ─────────────────────────────────────────────────────
const CATEGORIES = ["All", "Ducting", "Insulation", "HVAC"];

// ─── Colour helper per category ──────────────────────────────────────────────
const catColor = { Ducting: "#00D2C4", Insulation: "#FF6B35", HVAC: "#1E3E62" };

export default function OurProjects() {
  const [filter,        setFilter]        = useState("All");
  const [hovered,       setHovered]       = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <main
      style={{
        padding: "60px 20px 80px",
        background: "var(--bg-slate)",
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; }                            to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; }   to { transform: scale(1); opacity: 1; } }
      `}</style>

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span style={{
          display: "inline-block",
          background: "rgba(0,210,196,0.1)",
          border: "1px solid rgba(0,210,196,0.25)",
          color: "var(--hvac-blue)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          padding: "6px 18px",
          borderRadius: "30px",
          marginBottom: "14px",
        }}>
          Our Portfolio
        </span>
        <h1 style={{
          fontSize: "clamp(26px,4vw,40px)",
          fontWeight: 800,
          color: "var(--primary-navy)",
          margin: "0 0 10px",
          lineHeight: 1.2,
        }}>
          HVAC & MEP Project Gallery
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "15px", marginTop: "8px", maxWidth: 580, margin: "0 auto" }}>
          A showcase of successfully executed HVAC, ducting, and insulation contracts across
          pharmaceutical, automotive, and industrial sectors.
        </p>
        {/* Total count */}
        <p style={{ marginTop: 10, fontSize: 13, color: "var(--text-muted)" }}>
          <strong style={{ color: "var(--primary-navy)" }}>{projectsData.length} projects</strong> delivered across 9 trusted clients
        </p>
      </div>

      {/* ── Filter Buttons ────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "44px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "9px 26px",
              border: "1.5px solid",
              borderColor: filter === cat ? "var(--hvac-blue)" : "var(--border-color)",
              cursor: "pointer",
              background: filter === cat ? "var(--hvac-blue)" : "var(--card-bg)",
              color: filter === cat ? "#fff" : "var(--text-dark)",
              borderRadius: "30px",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.2s ease",
              boxShadow: filter === cat ? "0 6px 18px rgba(0,210,196,0.25)" : "none",
            }}
          >
            {cat}{cat !== "All" && ` (${projectsData.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* ── Project Grid ──────────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "28px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActiveProject(p)}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: hovered === p.id ? "var(--shadow-xl)" : "var(--shadow-md)",
              transform: hovered === p.id ? "translateY(-6px)" : "translateY(0)",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              border: hovered === p.id ? "1.5px solid var(--hvac-blue)" : "1px solid var(--border-color)",
              background: "var(--card-bg)",
            }}
          >
            {/* Category Badge */}
            <div style={{
              position: "absolute",
              top: 14,
              left: 14,
              zIndex: 3,
              background: catColor[p.category] || "#1E3E62",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 20,
            }}>
              {p.category}
            </div>

            {/* Client logo badge */}
            {p.clientLogo && (
              <div style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 3,
                background: "rgba(255,255,255,0.92)",
                borderRadius: 10,
                padding: "5px 10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}>
                <img
                  src={p.clientLogo}
                  alt={`${p.client} logo`}
                  style={{ width: 52, height: 28, objectFit: "contain", display: "block" }}
                />
              </div>
            )}

            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
              <img
                src={p.image}
                alt={p.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform: hovered === p.id ? "scale(1.07)" : "scale(1)",
                }}
              />
            </div>

            {/* Overlay Footer */}
            <div style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              background: "linear-gradient(to top, rgba(11,25,44,0.96), rgba(11,25,44,0.45))",
              color: "#fff",
              padding: "20px 18px 16px",
            }}>
              <h4 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700 }}>{p.name}</h4>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 4 }}>
                🏢 {p.client}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ────────────────────────────────────────────── */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11,25,44,0.9)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card-bg)",
              borderRadius: 18,
              overflow: "hidden",
              maxWidth: 860,
              width: "100%",
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6)",
              border: "1px solid var(--border-color)",
              animation: "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: "absolute",
                top: 14, right: 14,
                background: "rgba(11,25,44,0.85)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 40, height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer",
                zIndex: 10,
              }}
            >✕</button>

            {/* Image */}
            <div style={{ background: "#000", maxHeight: 460, overflow: "hidden" }}>
              <img
                src={activeProject.image}
                alt={activeProject.alt}
                style={{ width: "100%", height: "auto", maxHeight: 460, objectFit: "contain", display: "block", margin: "0 auto" }}
              />
            </div>

            {/* Info Panel */}
            <div style={{ padding: "24px 28px 28px", background: "#fff" }}>
              {/* Category + Client Logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <span style={{
                  background: catColor[activeProject.category] || "#1E3E62",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "4px 14px",
                  borderRadius: 20,
                }}>
                  {activeProject.category}
                </span>
                {activeProject.clientLogo && (
                  <img
                    src={activeProject.clientLogo}
                    alt={activeProject.client}
                    style={{ height: 36, objectFit: "contain" }}
                  />
                )}
              </div>

              <h3 style={{ color: "var(--primary-navy)", fontWeight: 800, marginBottom: 6, fontSize: 22 }}>
                {activeProject.name}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                {activeProject.description}
              </p>

              {/* Meta chips */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "var(--primary-navy)", display: "flex", alignItems: "center", gap: 5 }}>
                  🏢 <strong>{activeProject.client}</strong>
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
                  📅 {activeProject.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

import React from "react";
import "./Customers.css";

import Cipla      from "../Assets/Cipla.png";
import Panacea    from "../Assets/Panacea.jpg";
import IndSwift   from "../Assets/IndSwift.png";
import LifeCare   from "../Assets/LifeCare.png";
import Hella      from "../Assets/Hella.jpg";
import FPCL       from "../Assets/FPCL.png";
import Growel     from "../Assets/Growel.png";
import Nector     from "../Assets/Nector.png";
import Allenger   from "../Assets/allenger.jpg";

// ─── Customer Data ──────────────────────────────────────────────────────────
const CUSTOMERS = [
  {
    name: "Cipla Ltd.",
    image: Cipla,
    industry: "Pharmaceutical",
  },
  {
    name: "Panacea Biotec",
    image: Panacea,
    industry: "Pharmaceutical",
  },
  {
    name: "Ind-Swift Labs",
    image: IndSwift,
    industry: "Pharmaceutical",
  },
  {
    name: "LifeCare Innovations",
    image: LifeCare,
    industry: "Healthcare",
  },
  {
    name: "Hella India",
    image: Hella,
    industry: "Automotive",
  },
  {
    name: "FPCL",
    image: FPCL,
    industry: "Manufacturing",
  },
  {
    name: "Growel Pharmaceuticals",
    image: Growel,
    industry: "Pharmaceutical",
  },
  {
    name: "Nectar Lifesciences",
    image: Nector,
    industry: "Pharmaceutical",
  },
  {
    name: "Allengers Medical",
    image: Allenger,
    industry: "Medical Devices",
  },
];

const STATS = [
  { number: "9+", label: "Trusted Clients" },
  { number: "50+", label: "Projects Delivered" },
  { number: "10+", label: "Years Experience" },
  { number: "100%", label: "On-Time Delivery" },
];

const TRUST_BADGES = [
  { icon: "✅", text: "ISO-Compliant Installations" },
  { icon: "🏭", text: "Pharma-Grade Cleanrooms" },
  { icon: "🔒", text: "Confidentiality Assured" },
  { icon: "⚡", text: "Zero Defect Execution" },
];

// ─── CustomerSlider Component ────────────────────────────────────────────────
const CustomerSlider = () => {
  // Duplicate array for seamless infinite scroll
  const doubled = [...CUSTOMERS, ...CUSTOMERS];
  const reversed = [...CUSTOMERS].reverse();
  const doubledReversed = [...reversed, ...reversed];

  return (
    <section className="customers-section" aria-label="Our Customers">
      <div className="container-fluid px-4 px-md-5">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="customers-header">
          <div className="customers-eyebrow">
            🤝 Our Valued Clients
          </div>
          <h2 className="customers-title">
            Trusted by <span>Industry Leaders</span>
          </h2>
          <p className="customers-subtitle">
            From pharmaceutical giants to automotive manufacturers — we deliver
            precision HVAC and MEP solutions for the most demanding facilities
            across all India.
          </p>
        </div>

        {/* ── Stats ───────────────────────────────────────────────────── */}
        <div className="customers-stats">
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="stat-item">
                <span className="stat-number">{s.number}</span>
                <p className="stat-label">{s.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="stat-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Scrolling Logo Strip – Row 1 ────────────────────────────── */}
        <div className="logos-outer">
          <div className="logos-track">
            {doubled.map((c, i) => (
              <div className="logo-card" key={`r1-${i}`} title={`${c.name} — ${c.industry}`}>
                <img src={c.image} alt={`${c.name} logo – CoolRite Engineers client`} />
                <span className="logo-card-name">{c.name}</span>
              </div>
            ))}
          </div>

          {/* ── Scrolling Logo Strip – Row 2 (reverse) ────────────────── */}
          <div className="logos-track-reverse">
            {doubledReversed.map((c, i) => (
              <div className="logo-card" key={`r2-${i}`} title={`${c.name} — ${c.industry}`}>
                <img src={c.image} alt={`${c.name} logo`} />
                <span className="logo-card-name">{c.industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trust Badges ─────────────────────────────────────────────── */}
        <div className="trust-strip">
          {TRUST_BADGES.map((b, i) => (
            <div className="trust-badge" key={i}>
              <div className="trust-icon">{b.icon}</div>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerSlider;

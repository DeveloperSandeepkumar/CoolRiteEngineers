import React from "react";
import AboutUsPic from '../Assets/AboutUs.jpg';
import MepInfo from '../Component/Mep';

const AboutUs = () => {
  return (
    <main style={{ background: "var(--bg-slate)", fontFamily: "'Outfit', sans-serif" }}>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src={AboutUsPic}
          alt="About CoolRite Engineers industrial MEP consultancy and HVAC installations"
          style={{ height: "320px", width: "100%", objectFit: "cover" }}
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 rounded"
          style={{ background: "rgba(11, 25, 44, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>About Us</h1>
          <p className="mb-0 text-uppercase letter-spacing-1">CoolRite Engineers</p>
        </div>
      </div>

      {/* Info Section */}
      <section aria-label="Company Overview">
        <MepInfo />
      </section>
    </main>
  );
};

export default AboutUs;

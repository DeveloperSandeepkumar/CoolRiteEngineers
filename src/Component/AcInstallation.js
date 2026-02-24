import React from "react";
// import "./AcInstallation.css";
import ac1 from "../Assets/1.jpg";
import ac2 from "../Assets/1.jpg";
import ac3 from "../Assets/1.jpg";

const AcInstallation = () => {
  return (
    <div className="ac-page">

      {/* Hero Section */}
      <div className="ac-hero text-center">
        <h1>Professional AC Installation Services</h1>
        <p>Reliable • Energy Efficient • Expert Technicians</p>
      </div>

      {/* Image Section */}
      <div className="container py-5">
        <div className="row g-4">

          <div className="col-md-4">
            <img src={ac1} alt="AC Installation Service" className="ac-img" />
          </div>

          <div className="col-md-4">
            <img src={ac2} alt="Split AC Installation" className="ac-img" />
          </div>

          <div className="col-md-4">
            <img src={ac3} alt="Commercial AC Installation" className="ac-img" />
          </div>

        </div>
      </div>

      {/* Service Details */}
      <div className="container pb-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h2>Expert AC Installation</h2>
            <p>
              We provide professional air conditioning installation services
              for residential, commercial, and industrial spaces. Our skilled
              technicians ensure proper setup, optimal cooling performance,
              and long-term energy efficiency.
            </p>
            <ul className="ac-list">
              <li>✔ Split & Window AC Installation</li>
              <li>✔ VRV / VRF Systems</li>
              <li>✔ Centralized Cooling Systems</li>
              <li>✔ Ducting & Insulation Work</li>
              <li>✔ Testing & Commissioning</li>
            </ul>
          </div>

          <div className="col-md-6">
            <img src={ac1} alt="AC Technician Working" className="ac-img-large" />
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="ac-why py-5 text-center">
        <h2>Why Choose Us?</h2>
        <div className="container mt-4">
          <div className="row">

            <div className="col-md-4">
              <div className="ac-card">
                <h5>Certified Experts</h5>
                <p>Experienced and trained installation professionals.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ac-card">
                <h5>On-Time Service</h5>
                <p>We complete projects without delays.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ac-card">
                <h5>Affordable Pricing</h5>
                <p>High-quality service at competitive rates.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AcInstallation;
import React, { useState } from "react";
import cd from "../Assets/CD.jpg"; // Banner image

const ProposalFormWithMap = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectSize: "",
    location: "",
    projectType: "Commercial"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proposal Request submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectSize: "",
      location: "",
      projectType: "Commercial"
    });
  };

  return (
    <main style={{ background: "var(--bg-slate)", fontFamily: "'Outfit', sans-serif" }}>
      {/* Banner Section */}
      <div className="position-relative">
        <img 
          src={cd} 
          alt="CoolRite Engineers engineering banner for projects" 
          style={{ height: "320px", width: "100%", objectFit: "cover" }} 
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 rounded"
          style={{ background: "rgba(11, 25, 44, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>Request Project Proposal</h1>
          <p className="mb-0 text-uppercase letter-spacing-1">CoolRite Engineers MEP Contracting</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="row shadow-lg bg-white rounded-3 overflow-hidden border">
              
              {/* LEFT SIDE – FORM */}
              <div className="col-lg-6 p-4 p-md-5">
                <h2 className="fw-bold mb-2" style={{ color: "var(--primary-navy)" }}>
                  Project Details
                </h2>
                <p className="text-muted mb-4">
                  Provide your requirements to get an accurate MEP & HVAC estimation.
                </p>
                {submitted && (
                  <div className="alert alert-success py-2 px-3 mb-4" role="alert">
                    <strong>Success!</strong> Your proposal request has been received. Our team will contact you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control py-2" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control py-2" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-control py-2" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Project Size (in sq. ft.) *</label>
                    <input 
                      type="text" 
                      name="projectSize"
                      className="form-control py-2" 
                      value={formData.projectSize}
                      onChange={handleChange}
                      placeholder="e.g., 5000"
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Project Location *</label>
                    <input 
                      type="text" 
                      name="location"
                      className="form-control py-2" 
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Baddi Industrial Area"
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-muted small">Type of Project *</label>
                    <select 
                      name="projectType"
                      className="form-select py-2"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Institutional">Institutional</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg w-100 fw-bold text-white"
                    style={{ background: "var(--primary-navy)", border: "none", padding: "12px 0" }}
                  >
                    Submit Proposal Request
                  </button>
                </form>
              </div>

              {/* RIGHT SIDE – MAP */}
              <div className="col-lg-6 p-0 d-flex">
                <iframe
                  title="CoolRite Engineers corporate head office location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.813817872341!2d76.7758831!3d30.9455745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff57de71ccde7%3A0xb513973c84f8c7e0!2sGoogle+Maps+Location!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProposalFormWithMap;
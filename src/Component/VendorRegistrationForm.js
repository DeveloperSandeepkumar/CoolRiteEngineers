import React, { useState } from "react";
import cd from "../Assets/CD.jpg";
import vndreg from "../Assets/Colrite_files/vndrg.jpg";

const VendorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    gst: null,
    pan: null,
    passbook: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Vendor registration submitted successfully! Our procurement team will review your documents.");
  };

  const inputStyle = { borderRadius: "6px" };

  const buttonStyle = {
    background: "var(--primary-navy)",
    color: "#fff",
    fontWeight: 600,
    borderRadius: "6px",
    padding: "12px 0",
    border: "none",
    transition: "background var(--transition-fast)",
  };

  return (
    <main style={{ background: "var(--bg-slate)", fontFamily: "'Outfit', sans-serif" }}>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src={cd}
          alt="CoolRite Engineers vendor registration portal banner"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 rounded"
          style={{ background: "rgba(11, 25, 44, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>Vendor Registration</h1>
          <p className="mb-0 text-uppercase letter-spacing-1">Join Our Supply Network</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container py-5">
        <div className="row align-items-center g-4">
          
          {/* Left Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src={vndreg}
              alt="Vendor partners contracting with CoolRite Engineers"
              className="img-fluid rounded-3 shadow-sm border"
              style={{ maxHeight: "550px", width: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Right Form */}
          <div className="col-lg-6">
            <div className="shadow-sm rounded-3 p-4 p-md-5 bg-white border">
              <h3 className="fw-bold mb-2" style={{ color: "var(--primary-navy)" }}>
                Procurement Portal
              </h3>
              <p className="text-muted small mb-4">
                Please fill in your company details and attach valid copies of certifications.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <label htmlFor="name">Full Name *</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <label htmlFor="email">Email Address *</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <label htmlFor="phone">Phone Number *</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <label htmlFor="company">Company Name *</label>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">GST Certificate *</label>
                  <input
                    type="file"
                    className="form-control"
                    name="gst"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">PAN Card *</label>
                  <input
                    type="file"
                    className="form-control"
                    name="pan"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-muted small mb-1">
                    Passbook / Cancelled Cheque *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="passbook"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 fw-bold text-white" 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.background = "var(--secondary-navy)"}
                  onMouseLeave={(e) => e.target.style.background = "var(--primary-navy)"}
                >
                  Submit Registration
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default VendorRegistrationForm;
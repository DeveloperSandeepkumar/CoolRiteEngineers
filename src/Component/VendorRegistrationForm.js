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
    alert("Vendor registration submitted!");
  };

  const inputStyle = { borderRadius: "6px" };

  const buttonStyle = {
    background: "#242472",
    color: "#fff",
    fontWeight: 600,
    borderRadius: "6px",
    padding: "10px 0",
  };

  return (
    <>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src={cd}
          alt="Vendor Banner"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        <div
          className="position-absolute top-50 start-50 translate-middle text-center text-white"
        >
          <h2 className="fw-bold mb-1">Vendor Registration</h2>
          <p className="mb-0">CoolRite Engineers</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container py-4">
        <div className="row align-items-center g-4">
          
          {/* Left Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src={vndreg}
              alt="Vendor Register"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>

          {/* Right Form */}
          <div className="col-lg-6">
            <div className="shadow rounded p-4 bg-white">
              <h4 className="fw-bold mb-2">
                Vendor Registration Form
              </h4>
              <p className="text-muted small mb-3">
                Please fill all required fields and attach documents.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
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

                <div className="form-floating mb-2">
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

                <div className="form-floating mb-2">
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

                <div className="form-floating mb-2">
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
                  <label htmlFor="company" >Company Name *</label>
                </div>

                <div className="mb-2">
                  <label className="form-label small" style={{    float: 'left',color: 'brown'}}>GST Certificate *</label>
                  <input
                    type="file"
                    className="form-control"
                    name="gst"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small" style={{    float: 'left',color: 'brown'}}>PAN Card *</label>
                  <input
                    type="file"
                    className="form-control"
                    name="pan"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small" style={{    float: 'left',color: 'brown'}}>
                    Passbook / Cancel Cheque *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="passbook"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn w-100" style={buttonStyle}>
                  Submit Registration
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default VendorRegistrationForm;
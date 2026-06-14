import React, { useState } from "react";
import cd from "../Assets/CD.jpg"; // Banner image
import "./Career.css";

const Career = () => {
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "HVAC Design Engineer",
    experience: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
    } else {
      setResumeName("");
    }
  };

  const handleJobSelect = (jobTitle) => {
    setFormData({ ...formData, position: jobTitle });
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Career application submitted:", formData, "Resume:", resumeName);
    setSubmitted(true);
    setResumeName("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "HVAC Design Engineer",
      experience: "",
      message: ""
    });
  };

  const positions = [
    {
      title: "MEP Project Manager",
      department: "Project Execution",
      location: "Baddi, HP (On-site)",
      experience: "5+ Years",
      description: "Manage end-to-end execution of commercial & industrial MEP projects, ensure compliance with design specs, and manage client relations."
    },
    {
      title: "HVAC Design Engineer",
      department: "Design & Estimation",
      location: "Baddi, HP (Hybrid/On-site)",
      experience: "3+ Years",
      description: "Design HVAC layouts, select equipment, calculate thermal loads (heat load calculations), and prepare details for ducting/piping systems."
    },
    {
      title: "Site Supervisor - MEP",
      department: "Site Coordination",
      location: "North India (Travel required)",
      experience: "2+ Years",
      description: "Oversee day-to-day installation of HVAC, plumbing, and firefighting services at project sites, supervising sub-contractors and ensuring quality & safety."
    },
    {
      title: "Electrical Design Engineer",
      department: "Design & Estimation",
      location: "Baddi, HP (On-site)",
      experience: "3+ Years",
      description: "Prepare electrical single line diagrams, load calculations, cable sizing, layout designs for lighting, power, and low voltage systems."
    }
  ];

  return (
    <main className="career-container">
      {/* Banner Section */}
      <div className="position-relative">
        <img 
          src={cd} 
          alt="CoolRite Engineers career opportunities in HVAC and MEP contracting" 
          style={{ height: "320px", width: "100%", objectFit: "cover" }} 
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white career-banner-overlay">
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>Career Opportunities</h1>
          <p className="mb-0 text-uppercase letter-spacing-1 small">Build Your Future with CoolRite Engineers</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Why Join Section */}
          <div className="col-lg-12 text-center mb-4">
            <h2 className="career-title">Why Join CoolRite Engineers?</h2>
            <p className="text-muted mx-auto mt-4" style={{ maxWidth: "800px", fontSize: "16px", lineHeight: "1.8" }}>
              As a fast-growing MEP & HVAC contracting firm in North India, we provide our employees with direct exposure to massive industrial projects, state-of-the-art design tools, and a collaborative work culture that nurtures career growth. Click on any job opening to apply directly.
            </p>
          </div>
          
          {/* Job Openings List */}
          <div className="col-lg-7">
            <h3 className="fw-bold mb-4" style={{ color: "var(--primary-navy)" }}>Current Openings</h3>
            
            <div className="d-flex flex-column gap-4">
              {positions.map((pos, index) => (
                <div 
                  key={index} 
                  className="job-card p-4 shadow-sm"
                  onClick={() => handleJobSelect(pos.title)}
                  title="Click to apply for this job"
                >
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                    <h5 className="fw-bold mb-0" style={{ color: "var(--secondary-navy)" }}>{pos.title}</h5>
                    <span className="job-badge">{pos.experience} Experience</span>
                  </div>
                  <div className="text-muted small mb-3">
                    <span className="me-3">🏢 {pos.department}</span>
                    <span>📍 {pos.location}</span>
                  </div>
                  <p className="text-muted mb-0 small" style={{ lineHeight: "1.6" }}>{pos.description}</p>
                  <div className="text-end mt-2">
                    <span className="text-uppercase fw-bold small text-decoration-none" style={{ color: "var(--hvac-blue)", fontSize: "12px" }}>
                      Click to Apply →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Apply Form */}
          <div className="col-lg-5" id="application-form">
            <div className="apply-card p-4 p-md-5">
              <h3 className="fw-bold mb-2 text-center" style={{ color: "var(--primary-navy)" }}>Quick Apply</h3>
              <p className="text-muted text-center mb-4 small">Fill out the details below to submit your job application to our HR team.</p>

              {submitted && (
                <div className="alert alert-success py-2 px-3 mb-4 text-center" role="alert">
                  <strong>Success!</strong> Your application has been submitted.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    className="apply-input-field" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    className="apply-input-field" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="apply-input-field" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Position Applied For *</label>
                  <select 
                    name="position"
                    className="apply-input-field"
                    value={formData.position}
                    onChange={handleChange}
                  >
                    <option value="MEP Project Manager">MEP Project Manager</option>
                    <option value="HVAC Design Engineer">HVAC Design Engineer</option>
                    <option value="Site Supervisor - MEP">Site Supervisor - MEP</option>
                    <option value="Electrical Design Engineer">Electrical Design Engineer</option>
                    <option value="Other">Other / General Application</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Years of Experience *</label>
                  <input 
                    type="text" 
                    name="experience"
                    className="apply-input-field" 
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3 years"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small mb-1">Attach CV / Resume *</label>
                  <label className={`custom-file-upload d-block ${resumeName ? 'file-selected' : ''}`}>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      required
                    />
                    <div className="text-muted small">
                      {resumeName ? (
                        <>
                          <span style={{ color: "var(--hvac-blue)" }} className="fw-bold">✓ Selected:</span> {resumeName}
                        </>
                      ) : (
                        "Upload Resume (PDF, DOC, DOCX)"
                      )}
                    </div>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-muted small mb-1">Brief Cover Message (Optional)</label>
                  <textarea 
                    name="message"
                    className="apply-input-field" 
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly highlight your key skills or notable projects..."
                  />
                </div>

                <button type="submit" className="apply-btn w-100">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Career;

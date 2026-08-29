import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import emailjs from "emailjs-com";
import cd from "../Assets/CD.jpg"; // Banner image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };
    emailjs
      .send(
        "service_g31h8cy",
        "template_lw7xkts",
        templateParams,
        "CdZQKISVQONA86P9K"
      )
      .then(() => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => setStatus("error"));
  };

  // Custom styles
  const styles = {
    card: {
      borderRadius: "12px",
      boxShadow: "var(--shadow-lg)",
      padding: "40px",
      backgroundColor: "#fff",
      maxWidth: "700px",
      margin: "0 auto",
      border: "1px solid var(--border-color)",
    },
    input: {
      height: "50px",
      fontSize: "15px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      padding: "0 15px",
      marginBottom: "20px",
      width: "100%",
    },
    textarea: {
      fontSize: "15px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      padding: "15px",
      marginBottom: "20px",
      width: "100%",
      resize: "none",
      height: "120px",
    },
    button: {
      backgroundColor: "var(--hvac-orange)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      width: "100%",
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      transition: "background var(--transition-fast)",
    },
    mapContainer: {
      marginTop: "60px",
    },
  };

  return (
    <main style={{ background: "var(--bg-slate)", fontFamily: "'Outfit', sans-serif" }}>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src={cd}
          alt="Contact CoolRite Engineers HVAC and MEP consulting"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 rounded"
          style={{ background: "rgba(11, 25, 44, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>Contact Us</h1>
          <p className="mb-0 text-uppercase letter-spacing-1">Get in Touch with Our Experts</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center g-5">
          {/* Contact Info */}
          <div className="col-lg-5">
            <h3 className="fw-bold mb-3" style={{ color: "var(--primary-navy)" }}>Get In Touch</h3>
            <p className="text-muted mb-4">We provide reliable, high-performance HVAC & MEP solutions for commercial and industrial projects across North India.</p>

            <div className="mb-4">
              <strong className="d-block text-uppercase small text-muted mb-1">📞 Phone Support</strong>
              <p className="mb-1"><a href="tel:+917009167480" className="text-decoration-none fw-bold" style={{ color: "var(--primary-navy)" }}>+91-7009167480</a></p>
              <p className="mb-0"><a href="tel:+917973418255" className="text-decoration-none fw-bold" style={{ color: "var(--primary-navy)" }}>+91-7973418255</a></p>
            </div>

            <div className="mb-4">
              <strong className="d-block text-uppercase small text-muted mb-1">📧 General Inquiries</strong>
              <p className="mb-0"><a href="mailto:coolriteengineers@gmail.com" className="text-decoration-none fw-bold" style={{ color: "var(--hvac-blue)" }}>coolriteengineers@gmail.com</a></p>
            </div>

            <div className="mb-4">
              <strong className="d-block text-uppercase small text-muted mb-1">🏢 Registered Head Office</strong>
              <p className="text-muted" style={{ lineHeight: "1.6" }}>
                SCO NO - 03 Village Malpur Upperla, Near Cipla Ltd., P.O Bhud, Baddi, Distt Solan, HP - 173205
              </p>
            </div>

            <div>
              <strong className="d-block text-uppercase small text-muted mb-1">⏰ Office Working Hours</strong>
              <p className="text-muted mb-0">Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div style={styles.card}>
              <h4 className="fw-bold mb-4" style={{ color: "var(--primary-navy)" }}>Send Us a Message</h4>

              {status === "success" && <div className="alert alert-success">Thank you! Your message was sent successfully.</div>}
              {status === "error" && <div className="alert alert-danger">Failed to send message. Please check your network and try again.</div>}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                />

                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                />

                <button 
                  type="submit" 
                  style={styles.button}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "var(--hvac-orange-hover)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "var(--hvac-orange)"}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <section className="container pb-5" style={styles.mapContainer}>
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{ color: "var(--primary-navy)" }}>
            Our Location
          </h2>
          <p className="text-muted">
            Find our primary engineering site and head office on the map.
          </p>
        </div>

        {/* Map */}
        <div className="ratio ratio-16x9 shadow-sm rounded border overflow-hidden">
          <iframe
            title="CoolRite Engineers head office Google Map location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.813817872341!2d76.7758831!3d30.9455745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff57de71ccde7%3A0xb513973c84f8c7e0!2sGoogle+Maps+Location!5e0!3m2!1sen!2sin!4v1700000000000"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;

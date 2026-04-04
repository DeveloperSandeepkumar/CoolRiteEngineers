import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import emailjs from "emailjs-com";

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
    hero: {
      background: "#222",
      color: "#fff",
      textAlign: "center",
      padding: "60px 20px",
    },
    card: {
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      padding: "40px",
      backgroundColor: "#fff",
      maxWidth: "700px",
      margin: "0 auto",
    },
    input: {
      height: "50px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "0 15px",
      marginBottom: "20px",
      width: "100%",
    },
    textarea: {
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "20px",
      width: "100%",
      resize: "none",
    },
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "12px",
      borderRadius: "50px",
      border: "none",
      width: "100%",
      cursor: "pointer",
    },
    mapContainer: {
      marginTop: "60px",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to contact our team.</p>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center g-4">
          {/* Contact Info */}
          <div className="col-12 col-md-5">
            <h4 className="mb-3">Get In Touch</h4>
            <p>We provide reliable high-performance solutions for industries.</p>

            <div className="mb-3">
              <strong>📞 Phone:</strong>
              <p><a href="tel:+917009167480">+91-7009167480</a></p>
              <p><a href="tel:+918194839585">+91-8194839585</a></p>
            </div>

            <div className="mb-3">
              <strong>📧 Email:</strong>
              <p><a href="mailto:accounts@coolriteengineers.in">accounts@coolriteengineers.in</a></p>
            </div>

            <div className="mb-3">
              <strong>🏢 Head Office:</strong>
              <p>
                Gulabgarh Road, Gill Colony Sec-09,<br/>
                Building No-361, Derabassi,<br/>
                Mohali, Punjab - 140507
              </p>
            </div>

            <div className="mb-3">
              <strong>🏭 Branch Office:</strong>
              <p>
                Village Malpur,<br/>
                Teh Baddi,<br/>
                Distt Solan, Himachal Pradesh
              </p>
            </div>

            <div>
              <strong>⏰ Working Hours:</strong>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-md-7">
            <div style={styles.card}>
              <h4 className="text-center mb-4">Send Us a Message</h4>

              {status === "success" && <div className="alert alert-success">Message sent successfully!</div>}
              {status === "error" && <div className="alert alert-danger">Failed to send message. Try again.</div>}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
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
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                />

                <button type="submit" style={styles.button}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
   <h4 className="text-center mb-3">Our Location</h4>
      <div className="container" style={styles.mapContainer}>
     
        <div className="ratio ratio-16x9">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.813817872341!2d76.7758831!3d30.9455745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff57de71ccde7%3A0xb513973c84f8c7e0!2sGoogle+Maps+Location!5e0!3m2!1sen!2sin!4v1700000000000"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

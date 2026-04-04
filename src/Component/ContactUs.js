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

  return (
    <div className="container-fluid p-0">

      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to contact our team.</p>
      </div>

      <div className="container my-5">
        <div className="row g-4">

          {/* Contact Info */}
          <div className="col-12 col-md-5">
            <h4 className="mb-3">Get In Touch</h4>
            <p>We provide reliable high-performance solutions for industries.</p>

            <div className="mb-3">
              <strong>📞 Phone:</strong>
              <p className="mb-1"><a href="tel:+917009167480">+91-7009167480</a></p>
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

          {/* Professional Contact Form */}
          <div className="col-12 col-md-7">
            <div className="card shadow-lg rounded-4 p-4">
              <h4 className="text-center mb-4">Send Us a Message</h4>

              {status === "success" && (
                <div className="alert alert-success">Message sent successfully!</div>
              )}
              {status === "error" && (
                <div className="alert alert-danger">Failed to send message. Try again.</div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
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
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="subject">Subject</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    style={{ height: "120px" }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="message">Message</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  style={{ borderRadius: "50px" }}
                >
                  Send Message
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Google Map */}
      <div className="container mb-5">
        <h4 className="text-center mb-3">Our Location</h4>
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

import React, { useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import emailjs from 'emailjs-com';

import ClientImg from '../Assets/Client.jpg';
import CoolriteSlider from '../Assets/CoolriteSlider.jpeg';
import CoolriteSlider2 from '../Assets/CoolRiteSlider2.jpg';
import CoolriteSlider3 from '../Assets/CoolRiteSlider3.jpg';

import CardList from '../Component/OurServiceDetails.js';
import '../Component/Home.css';
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
import GetInTouch from '../Assets/GetInTouch.jpg';

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    Phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.emailAddress,
      phone: formData.Phone,
      message: formData.message,
    };

    emailjs.send(
      "service_g31h8cy",
      "template_lw7xkts",
      templateParams,
      "CdZQKISVQONA86P9K"
    )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          emailAddress: "",
          Phone: "",
          message: ""
        });
      })
      .catch(() => {
        alert("Failed to send message. Try again.");
      });
  };

  return (
    <main>
      {/* Carousel Section */}
      <section id="carouselExampleControls" className="carousel slide overlay" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="dark-img">
              <img 
                src={CoolriteSlider} 
                className="d-block w-100 zoom-anim" 
                alt="CoolRite Engineers industrial HVAC services and central air conditioning installations by Colrite" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading fade-up">CoolRite Engineers</h1>
              <h5 className="carousel-subheading fade-up delay-1">High Performance MEP & HVAC Solutions For Industries</h5>

              <div className="button-group fade-up delay-2">
                <button className="button-modern" onClick={() => navigate("/about")}>
                  About Us
                </button>

                <button className="button-modern" onClick={() => navigate("/contactUs")}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="dark-img">
              <img 
                src={CoolriteSlider2} 
                className="d-block w-100 zoom-anim" 
                alt="Professional AC ducting, air handling units, and chiller system installations by Cool Rite" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading fade-up">Premium HVAC Design</h1>
              <h5 className="carousel-subheading fade-up delay-1">Accurate Air Balancing & Customized Duct Layouts</h5>

              <div className="button-group fade-up delay-2">
                <button className="button-modern" onClick={() => navigate("/about")}>
                  About Us
                </button>

                <button className="button-modern" onClick={() => navigate("/contactUs")}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div className="dark-img">
              <img 
                src={CoolriteSlider3} 
                className="d-block w-100 zoom-anim" 
                alt="Commercial ventilation, firefighting setups, and pipe insulation contracting work by Coolriteengineers" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading font-weight-bold fade-up">Complete MEP Contracting</h1>
              <h5 className="carousel-subheading fade-up delay-1">Consultancy With Zero Delays & High Efficiency BOQs</h5>

              <div className="button-group fade-up delay-2">
                <button className="button-modern" onClick={() => navigate("/about")}>
                  About Us
                </button>

                <button className="button-modern" onClick={() => navigate("/contactUs")}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </section>

      {/* Info Section */}
      <section aria-label="About MEP Consultancy">
        <MepInfo />
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white" aria-label="Our MEP Services">
        <div className="container text-center mb-4">
          <h2 className="fw-bold" style={{ color: 'var(--primary-navy)', fontFamily: 'Outfit, sans-serif' }}>
            Our MEP & HVAC Services
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Providing comprehensive engineering contracting, design, and maintenance across North India.
          </p>
        </div>
        <CardList />
      </section>

      {/* Quick Enquiry Contact Form Section */}
      <section className="Get_touch py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div className="card border-0 rounded-3 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="card-body p-0">
                  <div className="row g-0 align-items-center">

                    <div className="col-lg-6 d-none d-lg-block">
                      <img 
                        src={GetInTouch} 
                        style={{ width: '100%', height: '520px', objectFit: 'cover' }} 
                        alt="Get in touch with CoolRite Engineers for quick HVAC project proposals" 
                      />
                    </div>

                    <div className="col-lg-6 p-4 p-md-5">
                      <div className="text-center text-lg-start mb-4">
                        <h3 className="fw-bold" style={{ color: 'var(--primary-navy)', fontFamily: 'Outfit, sans-serif' }}>
                          Quick Enquiry
                        </h3>
                        <p className="text-muted">Fill out the form below to receive a response from our engineering consultants within 24 hours.</p>
                      </div>

                      <form onSubmit={handleSubmit}>

                        <div className="form-floating mb-3">
                          <input 
                            className="form-control" 
                            id="name" 
                            type="text"
                            placeholder="Full Name"
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                          />
                          <label htmlFor="name">Full Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input 
                            className="form-control" 
                            id="emailAddress" 
                            type="email"
                            placeholder="Email Address"
                            value={formData.emailAddress} 
                            onChange={handleChange} 
                            required 
                          />
                          <label htmlFor="emailAddress">Email Address</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input 
                            className="form-control" 
                            id="Phone" 
                            type="text"
                            placeholder="Phone Number"
                            value={formData.Phone} 
                            onChange={handleChange} 
                            required 
                          />
                          <label htmlFor="Phone">Phone Number</label>
                        </div>

                        <div className="form-floating mb-3">
                          <textarea 
                            className="form-control" 
                            id="message"
                            placeholder="Your Message"
                            style={{ height: '120px' }}
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                          />
                          <label htmlFor="message">Project Requirements / Message</label>
                        </div>

                        <div className="d-grid">
                          <button 
                            className="btn btn-lg fw-bold text-white shadow-sm" 
                            type="submit" 
                            style={{ 
                              background: 'var(--hvac-orange)', 
                              border: 'none',
                              padding: '12px 0'
                            }}
                          >
                            Submit Enquiry
                          </button>
                        </div>

                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section className="py-5 bg-white" aria-label="Our Client Brands">
        <CustomerSlider />
      </section>

      {/* Feedback Banner */}
      <section className="ClientReviw" aria-label="Customer site review">
        <img 
          src={ClientImg} 
          className="ClientReviwImg" 
          alt="CoolRite Engineers industrial client site testing and commissioning overview" 
          style={{ objectFit: 'cover', maxHeight: '450px' }}
        />
      </section>
    </main>
  );
};

export default Home;

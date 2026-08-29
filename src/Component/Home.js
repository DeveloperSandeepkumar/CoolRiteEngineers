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
import './AboutUs.css';
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
import GetInTouch from '../Assets/GetInTouch.jpg';
import HemantPic from '../Assets/hemant_gupta.png';
import BasantPic from '../Assets/basant_gupta.png';
import SEO from './SEO';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Hemant Kumar Gupta",
    role: "Managing Director & MD",
    initials: "HKG",
    photo: HemantPic,
    phone: "+917009167480",
    email: "coolriteengineers@gmail.com",
    bio: "Over 15+ years of pioneering experience in HVAC design, ventilation projects, and industrial MEP engineering. Guiding CoolRite Engineers with strategic vision and excellence."
  },
  {
    name: "Basant Kumar Gupta",
    role: "Director",
    initials: "BKG",
    photo: BasantPic,
    phone: "+917973418255",
    email: "coolriteengineers@gmail.com",
    bio: "Expert in project coordination, site execution management, and quality control. Committed to delivering seamless, energy-efficient, and timely HVAC installations."
  }
];

const targetLocations = [
  {
    title: "Baddi & Nalagarh Industrial Belt (HP)",
    slug: "/locations/hvac-contractors-baddi-himachal",
    desc: "Specialized Pharma Cleanroom HVAC, GI & PI Sheet Ducting, double skin AHU units, and industrial ventilation in Baddi Phase 1, Phase 2, Barotiwala, & Nalagarh.",
    tag: "Primary Industrial Focus"
  },
  {
    title: "AC Ducting & Insulation Baddi",
    slug: "/locations/industrial-ducting-baddi",
    desc: "Precision rectangular & spiral duct fabrication, nitrile rubber insulation, acoustic lining, and air balancing for factories in Solan & Baddi.",
    tag: "Factory Ducting Specialist"
  },
  {
    title: "AHU & Cleanroom Ventilation Systems",
    slug: "/locations/ahu-ventilation-system-baddi",
    desc: "GMP & ISO class cleanroom air handling units, HEPA filtration setups, fresh air supply, and exhaust scrubbers across Himachal Pradesh.",
    tag: "Pharma Grade Air Quality"
  },
  {
    title: "Chandigarh, Mohali & Panchkula (Tricity)",
    slug: "/locations/hvac-contractors-chandigarh-mohali",
    desc: "Commercial VRV / VRF climate control, ductable split ACs, cassette units, and MEP engineering for corporate IT parks, hospitals, and showrooms.",
    tag: "Commercial HVAC Leader"
  },
  {
    title: "Industrial HVAC & Chiller Plants Punjab",
    slug: "/locations/industrial-hvac-mep-punjab",
    desc: "Statewide turnkey chiller plants, heavy-duty industrial exhaust, and MEP contracting across Ludhiana, Jalandhar, Amritsar, & Patiala.",
    tag: "Statewide Execution"
  }
];

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
      <SEO 
        title="CoolRite Engineers | Top HVAC & MEP Contractors in Baddi, Himachal & Punjab"
        description="CoolRite Engineers (Cool Rite / Colrite) provides turnkey HVAC, AC ducting, AHU ventilation, chiller plants, and MEP engineering across Baddi (HP), Solan, Chandigarh, Mohali & Punjab."
        keywords="HVAC contractors Baddi, industrial AC ducting Baddi, AHU ventilation system Baddi, MEP contractors Himachal Pradesh, HVAC Chandigarh Mohali, industrial HVAC Punjab"
        canonicalUrl="https://www.coolriteengineers.com"
      />

      {/* Carousel Section */}
      <section id="carouselExampleControls" className="carousel slide overlay" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="dark-img">
              <img 
                src={CoolriteSlider} 
                className="d-block w-100 zoom-anim" 
                alt="CoolRite Engineers industrial HVAC contractors and central air conditioning installations in Baddi Himachal Pradesh" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading fade-up">CoolRite Engineers</h1>
              <h2 className="carousel-subheading fade-up delay-1 fs-4 text-white">#1 HVAC, AC Ducting & MEP Contractors in Baddi, Himachal & Punjab</h2>

              <div className="button-group fade-up delay-2 mt-3">
                <button className="button-modern" onClick={() => navigate("/locations/hvac-contractors-baddi-himachal")}>
                  Baddi HVAC Services
                </button>

                <button className="button-modern" onClick={() => navigate("/contactUs")}>
                  Contact Engineers
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
                alt="Professional industrial AC ducting, air handling units (AHU), and chiller system installations in Baddi and Chandigarh by CoolRite" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading fade-up">Industrial HVAC & Ducting</h1>
              <h2 className="carousel-subheading fade-up delay-1 fs-4 text-white">Pharma Cleanroom Ventilation & Precision GI/PI Sheet Duct Fabrication</h2>

              <div className="button-group fade-up delay-2 mt-3">
                <button className="button-modern" onClick={() => navigate("/locations/industrial-ducting-baddi")}>
                  Ducting Solutions
                </button>

                <button className="button-modern" onClick={() => navigate("/contactUs")}>
                  Get Quick Quote
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
                alt="Commercial ventilation, firefighting setups, and MEP engineering contracting across Punjab, Mohali & Baddi by CoolRite Engineers" 
              />
            </div>

            <div className="carousel-caption custom-caption">
              <h1 className="carousel-heading font-weight-bold fade-up">Turnkey MEP Contracting</h1>
              <h2 className="carousel-subheading fade-up delay-1 fs-4 text-white">Mechanical, Electrical, Plumbing & Fire Safety Systems with Zero Delays</h2>

              <div className="button-group fade-up delay-2 mt-3">
                <button className="button-modern" onClick={() => navigate("/locations/industrial-hvac-mep-punjab")}>
                  Punjab MEP Projects
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

      {/* SEO Key Location Hub Section */}
      <section className="py-5" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary text-white px-3 py-2 fs-6 mb-2">Regional HVAC Coverage</span>
            <h2 className="fw-bold text-dark display-6">Target Service Hubs: Baddi, Himachal Pradesh & Punjab</h2>
            <p className="text-muted fs-5 max-w-3xl mx-auto">
              CoolRite Engineers specializes in high-efficiency industrial HVAC, pharma cleanrooms, GI sheet ducting, double-skin AHUs, and MEP consultancy across key regional industrial zones:
            </p>
          </div>

          <div className="row g-4">
            {targetLocations.map((loc, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all" style={{ borderRadius: '12px', borderLeft: '4px solid var(--hvac-orange)' }}>
                  <span className="badge bg-light text-primary border mb-3 w-fit-content px-3 py-1" style={{ width: 'fit-content' }}>
                    {loc.tag}
                  </span>
                  <h3 className="h5 fw-bold text-dark mb-2">{loc.title}</h3>
                  <p className="text-secondary small mb-4">{loc.desc}</p>
                  <Link to={loc.slug} className="btn btn-outline-primary btn-sm fw-semibold mt-auto align-self-start">
                    Explore {loc.title.split(' ')[0]} Hub &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section aria-label="About MEP Consultancy">
        <MepInfo />
      </section>

      {/* Leadership Team Section */}
      <section className="team-section" aria-label="Our Leadership Team" style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="reveal reveal-up">
            <h2 className="team-section-title">Our Leadership</h2>
            <p className="team-section-subtitle">
              Leading technological innovation and engineering success with commitment and expertise.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                className={`team-card reveal reveal-up delay-${(index + 1) * 200}`} 
                key={index} 
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="profile-container">
                  <div className="profile-image-wrapper">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="profile-img" />
                    ) : (
                      <div className="profile-avatar-placeholder">
                        <span>{member.initials}</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-bio">{member.bio}</p>

                <div className="team-social-links">
                  <a 
                    href={`tel:${member.phone}`} 
                    className="social-icon-btn phone" 
                    title={`Call ${member.name}`}
                  >
                    <FaPhoneAlt />
                  </a>
                  <a 
                    href={`https://wa.me/${member.phone.replace('+', '')}`} 
                    className="social-icon-btn whatsapp" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={`WhatsApp ${member.name}`}
                  >
                    <FaWhatsapp />
                  </a>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="social-icon-btn" 
                    title={`Email ${member.name}`}
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white" aria-label="Our MEP Services">
        <div className="container text-center mb-4 reveal reveal-up">
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
            <div className="col-xl-11 reveal reveal-zoom">
              <div className="card border-0 rounded-3 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="card-body p-0">
                  <div className="row g-0 align-items-center">

                    <div className="col-lg-6 d-none d-lg-block">
                      <img 
                        src={GetInTouch} 
                        style={{ width: '100%', height: '520px', objectFit: 'cover' }} 
                        alt="Get in touch with CoolRite Engineers for quick HVAC project proposals in Baddi and Punjab" 
                      />
                    </div>

                    <div className="col-lg-6 p-4 p-md-5">
                      <div className="text-center text-lg-start mb-4">
                        <h3 className="fw-bold" style={{ color: 'var(--primary-navy)', fontFamily: 'Outfit, sans-serif' }}>
                          Quick Enquiry & BOQ Estimate
                        </h3>
                        <p className="text-muted">Fill out the form below to receive a response from our HVAC engineering consultants within 24 hours.</p>
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
          alt="CoolRite Engineers industrial client site testing and commissioning overview in Baddi Himachal" 
          style={{ objectFit: 'cover', maxHeight: '450px' }}
        />
      </section>
    </main>
  );
};

export default Home;

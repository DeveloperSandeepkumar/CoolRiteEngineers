import React from "react";
import AboutUsPic from '../Assets/AboutUs.jpg';
import MepInfo from '../Component/Mep';
import HemantPic from '../Assets/hemant_gupta.png';
import BasantPic from '../Assets/basant_gupta.png';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './AboutUs.css';

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
    phone: "+918194839585",
    email: "coolriteengineers@gmail.com",
    bio: "Expert in project coordination, site execution management, and quality control. Committed to delivering seamless, energy-efficient, and timely HVAC installations."
  }
];

const AboutUs = () => {
  return (
    <main style={{ background: "var(--bg-slate)", fontFamily: "'Outfit', sans-serif" }}>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src={AboutUsPic}
          alt="About CoolRite Engineers industrial MEP consultancy and HVAC installations"
          style={{ height: "320px", width: "100%", objectFit: "cover" }}
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 rounded reveal reveal-zoom"
          style={{ background: "rgba(11, 25, 44, 0.6)", backdropFilter: "blur(4px)" }}
        >
          <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>About Us</h1>
          <p className="mb-0 text-uppercase letter-spacing-1">CoolRite Engineers</p>
        </div>
      </div>

      {/* Info Section */}
      <section aria-label="Company Overview">
        <MepInfo />
      </section>

      {/* Leadership Team Section */}
      <section className="team-section" aria-label="Our Leadership Team">
        <div className="reveal reveal-up">
          <h2 className="team-section-title">Our Leadership</h2>
          <p className="team-section-subtitle">
            Leading technological innovation and engineering success with commitment and expertise.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className={`team-card reveal reveal-up delay-${(index + 1) * 200}`} key={index}>
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
      </section>
    </main>
  );
};

export default AboutUs;

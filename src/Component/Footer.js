import React from "react";
import { NavLink } from 'react-router-dom';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoolRiteLogo1 from '../Assets/MainLogo.png';

import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaChevronRight 
} from "react-icons/fa";
import { services } from "../Component/servicesData";

const Footer = () => {
  return (
    <footer className="footer text-start">
      <div className="container">
        <div className="row g-4 justify-content-between">
          
          {/* Brand Column */}
          <div className="col-lg-3 col-md-6">
            <div className="text-start">
              <img 
                src={CoolRiteLogo1} 
                alt="CoolRite Engineers corporate logo" 
                className="footer-brand-logo" 
              />
              <p className="footer-brand-desc">
                Most Innovative MEP Consultants & HVAC Contractors. Delivering energy-efficient cooling solutions, precise duct fabrication, and expert MEP installations with zero delays.
              </p>
              <div className="footer-social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-2 col-md-6">
            <div className="text-start">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links-list">
                <li>
                  <NavLink to="/" className="footer-link">
                    <FaChevronRight style={{ fontSize: '10px' }} /> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/About" className="footer-link">
                    <FaChevronRight style={{ fontSize: '10px' }} /> About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Project" className="footer-link">
                    <FaChevronRight style={{ fontSize: '10px' }} /> Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Career" className="footer-link">
                    <FaChevronRight style={{ fontSize: '10px' }} /> Career
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ContactUs" className="footer-link">
                    <FaChevronRight style={{ fontSize: '10px' }} /> Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* MEP Services Column */}
          <div className="col-lg-3 col-md-6">
            <div className="text-start">
              <h5 className="footer-heading">MEP Services</h5>
              <ul className="footer-links-list">
                {services.slice(0, 5).map((service, index) => (
                  <li key={index}>
                    <NavLink to={service.path} className="footer-link">
                      <FaChevronRight style={{ fontSize: '10px' }} /> {service.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="col-lg-3 col-md-6">
            <div className="text-start">
              <h5 className="footer-heading">Quick Contact</h5>
              
              <div className="footer-contact-item">
                <FaPhoneAlt className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="tel:+917009167480" className="d-block">+91-7009167480</a>
                  <a href="tel:+917973418255" className="d-block">+91-7973418255</a>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" />
                <div className="footer-contact-text">
                  <a href="mailto:coolriteengineers@gmail.com">coolriteengineers@gmail.com</a>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaMapMarkerAlt className="footer-contact-icon" />
                <div className="footer-contact-text">
                  SCO NO - 03 Village Malpur Upperla, Near Cipla Ltd., P.O Bhud, Baddi, Distt Solan, HP - 173205
                </div>
              </div>

              <div className="footer-contact-item">
                <FaClock className="footer-contact-icon" />
                <div className="footer-contact-text">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom Footer Section */}
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom">
              <div>
                © {new Date().getFullYear()} CoolRite Engineers. All Rights Reserved.
              </div>
              <div className="footer-bottom-links">
                <a href="https://CoolRiteEngineers.com/" className="footer-bottom-link">Privacy Policy</a>
                <a href="https://CoolRiteEngineers.com/" className="footer-bottom-link">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

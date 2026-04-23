import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLongArrowAltRight } from "react-icons/fa";
import CoolRiteLogo1 from '../Assets/MainLogo.png';
import { services } from "../Component/servicesData";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-5">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <img 
              src={CoolRiteLogo1} 
              alt="CoolRite Logo" 
              style={{ width: "60px", borderRadius: "10px" }} 
            />
            <h5 className="mt-3 fw-bold">CoolRite Engineers</h5>
            <p>
              Most Innovative MEP Consultants delivering HVAC, Electrical, 
              Plumbing & Fire Fighting solutions with precision and quality.
            </p>
          </div>

          {/* Services */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Our Services</h6>
            {services.slice(0, 6).map((service, index) => (
              <p key={index}>
                <FaLongArrowAltRight />{" "}
                <NavLink to={service.path} className="footer-link">
                  {service.title}
                </NavLink>
              </p>
            ))}
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>

            <p><FaLongArrowAltRight /> <NavLink to="/" className="footer-link">Home</NavLink></p>
            <p><FaLongArrowAltRight /> <NavLink to="/About" className="footer-link">About Us</NavLink></p>
            <p><FaLongArrowAltRight /> <NavLink to="/Project" className="footer-link">Projects</NavLink></p>
            <p><FaLongArrowAltRight /> <NavLink to="/Career" className="footer-link">Career</NavLink></p>
            <p><FaLongArrowAltRight /> <NavLink to="/ContactUs" className="footer-link">Contact</NavLink></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Contact</h6>

            <p><FaPhoneAlt /> +91-7009167480</p>
            <p><FaPhoneAlt /> +91-7973418255</p>

            <p>
              <FaEnvelope /> Coolriteengineers@gmail.com
            </p>

            <p style={{ fontSize: "13px" }}>
              <FaMapMarkerAlt /> SCO NO - 03 Village Malpur Upperla near Cipla Ltd.  
              P.O Bhud, Teh Baddi, Distt Solan (HP - 173205)
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-3 border-top border-secondary">
        © {new Date().getFullYear()} CoolRite Engineers | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

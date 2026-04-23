import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLongArrowAltRight,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import CoolRiteLogo1 from "../Assets/MainLogo.png";
import { services } from "../Component/servicesData";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-pro">

      {/* ===== CTA Section ===== */}
      <div className="footer-cta">
        <h3>Need MEP / HVAC Solution for your project?</h3>
        <NavLink to="/ProposalFormWithMap" className="cta-btn">
          Get Free Consultation
        </NavLink>
      </div>

      <div className="footer-container">

        {/* ===== Brand ===== */}
        <div className="footer-col">
          <div className="footer-logo">
            <img src={CoolRiteLogo1} alt="CoolRite" />
            <h4>Coolrite Engineers</h4>
          </div>

          <p>
            Leading MEP & HVAC consultants delivering high-quality,
            error-free and on-time project execution across pharma,
            commercial & industrial sectors.
          </p>

          <div className="footer-social">
            <a href="https://wa.me/917009167480"><FaWhatsapp /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* ===== Services ===== */}
        <div className="footer-col">
          <h5>MEP Services</h5>
          {services.slice(0, 6).map((s, i) => (
            <NavLink key={i} to={s.path}>
              <FaLongArrowAltRight /> {s.title}
            </NavLink>
          ))}
        </div>

        {/* ===== Links ===== */}
        <div className="footer-col">
          <h5>Quick Links</h5>
          <NavLink to="/"><FaLongArrowAltRight /> Home</NavLink>
          <NavLink to="/About"><FaLongArrowAltRight /> About</NavLink>
          <NavLink to="/Project"><FaLongArrowAltRight /> Projects</NavLink>
          <NavLink to="/Career"><FaLongArrowAltRight /> Career</NavLink>
          <NavLink to="/ContactUs"><FaLongArrowAltRight /> Contact</NavLink>
        </div>

        {/* ===== Contact ===== */}
        <div className="footer-col">
          <h5>Contact</h5>

          <p><FaPhoneAlt /> +91-7009167480</p>
          <p><FaPhoneAlt /> +91-7973418255</p>

          <p><FaEnvelope /> Coolriteengineers@gmail.com</p>

          <p className="address">
            <FaMapMarkerAlt />
            SCO No. 03, Village Malpur Upperla, Near Cipla Ltd,
            P.O. Bhud, Baddi, Distt. Solan (HP - 173205)
          </p>
        </div>

      </div>

      {/* ===== Bottom ===== */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} CoolRite Engineers | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

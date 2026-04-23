import React, { useState } from "react";
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
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { services } from "../Component/servicesData";

const Footer = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const quickLinks = [
    { label: "Home",            path: "/" },
    { label: "About Us",        path: "/About" },
    { label: "Our Products",    path: "/OurProduct" },
    { label: "Projects",        path: "/Project" },
    { label: "Career",          path: "/Career" },
    { label: "Contact Us",      path: "/ContactUs" },
  ];

  const otherLinks = [
    { label: "Request Proposal",          path: "/ProposalFormWithMap" },
    { label: "Vendor Registration",       path: "/VendorRegistrationForm" },
    { label: "Pay Now",                   path: "" },
    { label: "Our Clients",               path: "" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cr-footer {
          font-family: 'DM Sans', sans-serif;
          background: #080d14;
          color: #a0aec0;
          position: relative;
          overflow: hidden;
        }

        /* top accent bar */
        .cr-footer::before {
          content: '';
          display: block;
          height: 3px;
          background: linear-gradient(90deg, #0ea5e9 0%, #2563eb 50%, #0ea5e9 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* subtle grid pattern */
        .cr-footer-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .cr-footer-main {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 32px 40px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 48px;
        }

        @media (max-width: 1024px) {
          .cr-footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 600px) {
          .cr-footer-main {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 20px 28px;
          }
        }

        /* ── Brand column ── */
        .cr-brand-wrap {}
        .cr-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cr-logo-img {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(14,165,233,0.3);
        }
        .cr-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #f0f6ff;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }
        .cr-brand-tag {
          font-size: 10px;
          color: #0ea5e9;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 2px;
        }
        .cr-brand-desc {
          font-size: 13px;
          line-height: 1.8;
          color: #64748b;
          margin-bottom: 20px;
          max-width: 280px;
        }
        .cr-social-row {
          display: flex;
          gap: 10px;
        }
        .cr-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          transition: all 0.2s;
        }
        .cr-social-btn:hover {
          background: #0ea5e9;
          border-color: #0ea5e9;
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── Column headings ── */
        .cr-col-title {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #f0f6ff;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .cr-col-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 28px;
          height: 2px;
          background: #0ea5e9;
          border-radius: 2px;
        }

        /* ── Nav links ── */
        .cr-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cr-link-list li a {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #64748b;
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s, gap 0.2s;
        }
        .cr-link-list li a:hover {
          color: #0ea5e9;
          gap: 12px;
        }
        .cr-link-list li a svg {
          font-size: 10px;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .cr-link-list li a:hover svg {
          transform: translateX(2px);
        }

        /* ── Services accordion (mobile) ── */
        .cr-services-toggle {
          display: none;
          width: 100%;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 600px) {
          .cr-services-toggle { display: flex; }
          .cr-services-list { display: none; }
          .cr-services-list.open { display: flex; }
        }

        /* ── Contact column ── */
        .cr-contact-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          align-items: flex-start;
        }
        .cr-contact-icon {
          width: 32px;
          height: 32px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0ea5e9;
          font-size: 12px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .cr-contact-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #334155;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .cr-contact-value {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.6;
        }
        .cr-contact-value a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .cr-contact-value a:hover {
          color: #0ea5e9;
        }

        /* ── Divider ── */
        .cr-footer-divider {
          position: relative;
          z-index: 1;
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0 32px;
        }

        /* ── Bottom bar ── */
        .cr-footer-bottom {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .cr-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 20px;
          }
        }
        .cr-copyright {
          font-size: 12px;
          color: #334155;
        }
        .cr-copyright a {
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 500;
        }
        .cr-bottom-links {
          display: flex;
          gap: 20px;
        }
        .cr-bottom-links a {
          font-size: 12px;
          color: #334155;
          text-decoration: none;
          transition: color 0.2s;
        }
        .cr-bottom-links a:hover {
          color: #0ea5e9;
        }

        /* ── Tagline badge ── */
        .cr-tagline-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.2);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          color: #0ea5e9;
          font-weight: 500;
          margin-bottom: 16px;
          letter-spacing: 0.3px;
        }
        .cr-tagline-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0ea5e9;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      <footer className="cr-footer">
        <div className="cr-footer-grid-bg" />

        <div className="cr-footer-main">

          {/* ── Col 1: Brand ── */}
          <div className="cr-brand-wrap">
            <div className="cr-logo-row">
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>❄️</div>
              <div>
                <div className="cr-brand-name">Coolrite Engineers</div>
                <div className="cr-brand-tag">HVAC · MEP · Cleanroom</div>
              </div>
            </div>

            <div className="cr-tagline-badge">
              Most Innovative MEP Consultants
            </div>

            <p className="cr-brand-desc">
              Delivering precision-engineered MEP solutions — HVAC, cleanrooms,
              plumbing, fire fighting, electrical &amp; pharma projects —
              with zero delays and zero errors.
            </p>

            <div className="cr-social-row">
              <a href="https://wa.me/917009167480" target="_blank" rel="noreferrer"
                className="cr-social-btn" title="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="#" className="cr-social-btn" title="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="cr-social-btn" title="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="cr-social-btn" title="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <div className="cr-col-title">Quick Links</div>
            <ul className="cr-link-list">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <NavLink to={l.path}>
                    <FaLongArrowAltRight />
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 8, paddingTop: 8 }}>
                <NavLink to="/ProposalFormWithMap">
                  <FaLongArrowAltRight />
                  Request Proposal
                </NavLink>
              </li>
              <li>
                <NavLink to="/VendorRegistrationForm">
                  <FaLongArrowAltRight />
                  Vendor Registration
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ── Col 3: MEP Services ── */}
          <div>
            <div className="cr-col-title">MEP Services</div>
            <ul className={`cr-link-list cr-services-list${servicesOpen ? " open" : ""}`}>
              {services.slice(0, 10).map((s, i) => (
                <li key={i}>
                  <NavLink to={s.path}>
                    <FaLongArrowAltRight />
                    {s.title}
                  </NavLink>
                </li>
              ))}
              {services.length > 10 && (
                <li>
                  <span style={{ fontSize: 11, color: "#334155", paddingLeft: 18 }}>
                    +{services.length - 10} more services
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <div className="cr-col-title">Contact Us</div>

            <div className="cr-contact-item">
              <div className="cr-contact-icon"><FaPhoneAlt /></div>
              <div>
                <div className="cr-contact-label">Phone</div>
                <div className="cr-contact-value">
                  <a href="tel:+917009167480">+91-7009167480</a><br />
                  <a href="tel:+917973418255">+91-7973418255</a>
                </div>
              </div>
            </div>

            <div className="cr-contact-item">
              <div className="cr-contact-icon"><FaEnvelope /></div>
              <div>
                <div className="cr-contact-label">Email</div>
                <div className="cr-contact-value">
                  <a href="mailto:Coolriteengineers@gmail.com">
                    Coolriteengineers@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="cr-contact-item">
              <div className="cr-contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <div className="cr-contact-label">Head Office</div>
                <div className="cr-contact-value">
                  SCO No. 03, Village Malpur Upperla,<br />
                  Near Cipla Ltd., P.O. Bhud,<br />
                  Teh. Baddi, Distt. Solan<br />
                  Himachal Pradesh – 173205
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cr-footer-divider" />

        <div className="cr-footer-bottom">
          <p className="cr-copyright">
            © {new Date().getFullYear()} Copyright —{" "}
            <a href="https://CoolRiteEngineers.com/" target="_blank" rel="noreferrer">
              CoolRiteEngineers.com
            </a>
            . All rights reserved.
          </p>
          <div className="cr-bottom-links">
            <NavLink to="/About">About</NavLink>
            <NavLink to="/ProposalFormWithMap">Get a Quote</NavLink>
            <NavLink to="/Career">Careers</NavLink>
            <NavLink to="/ContactUs">Contact</NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

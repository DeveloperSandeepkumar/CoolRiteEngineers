import React, { useState, useEffect } from "react";
import emailjs from 'emailjs-com';

import ClientImg from '../Assets/Client.jpg';
import CoolriteSlider from '../Assets/CoolriteSlider.jpeg';
import CoolriteSlider2 from '../Assets/CoolRiteSlider2.jpg';
import CoolriteSlider3 from '../Assets/CoolriteSlider3.jpg';

import CardList from '../Component/OurServiceDetails.js';
import AboutUs from "./AboutUs.js";
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
import GetInTouch from '../Assets/GetInTouch.jpg';

import { useNavigate } from "react-router-dom";

/* ── inline styles ── */
const S = {
  /* carousel */
  carouselWrap: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  slide: (active) => ({
    position: "absolute",
    inset: 0,
    opacity: active ? 1 : 0,
    transition: "opacity 1s ease",
    pointerEvents: active ? "auto" : "none",
  }),
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.38)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(0,40,80,0.55) 0%, rgba(0,0,0,0.15) 100%)",
  },
  caption: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    width: "90%",
    maxWidth: 820,
    zIndex: 10,
  },
  tag: {
    display: "inline-block",
    border: "1px solid rgba(255,255,255,0.45)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    padding: "6px 20px",
    borderRadius: 2,
    marginBottom: 22,
  },
  h1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(38px, 6vw, 80px)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.1,
    margin: "0 0 16px",
    letterSpacing: "-1px",
  },
  accent: { color: "#4fc3f7" },
  sub: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "clamp(14px, 2vw, 18px)",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 300,
    letterSpacing: 1,
    marginBottom: 40,
  },
  btnRow: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: {
    background: "#0077b6",
    color: "#fff",
    border: "none",
    padding: "14px 36px",
    borderRadius: 3,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background .2s, transform .2s",
    fontFamily: "'Lato', sans-serif",
  },
  btnOutline: {
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.6)",
    padding: "14px 36px",
    borderRadius: 3,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background .2s, color .2s",
    fontFamily: "'Lato', sans-serif",
  },
  /* nav dots */
  dots: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 8,
    zIndex: 10,
  },
  dot: (active) => ({
    width: active ? 28 : 8,
    height: 8,
    borderRadius: 4,
    background: active ? "#4fc3f7" : "rgba(255,255,255,0.4)",
    transition: "all .3s",
    cursor: "pointer",
    border: "none",
    padding: 0,
  }),
  /* arrow */
  arrow: (dir) => ({
    position: "absolute",
    top: "50%",
    [dir]: 24,
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.1)",
    border: "1.5px solid rgba(255,255,255,0.3)",
    color: "#fff",
    width: 48,
    height: 48,
    borderRadius: "50%",
    fontSize: 20,
    cursor: "pointer",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
    transition: "background .2s",
  }),

  /* stats strip */
  strip: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    background: "#0d1b2a",
    flexWrap: "wrap",
  },
  statBox: {
    flex: "1 1 180px",
    padding: "32px 24px",
    textAlign: "center",
    borderRight: "1px solid rgba(255,255,255,0.07)",
  },
  statNum: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 40,
    color: "#4fc3f7",
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "'Lato', sans-serif",
  },

  /* section wrapper */
  section: (bg) => ({
    padding: "88px 40px",
    background: bg || "#f8f9fa",
  }),
  sectionInner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  sectionEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
    justifyContent: "center",
  },
  line: {
    flex: "0 0 40px",
    height: 1,
    background: "#0077b6",
  },
  eyebrowText: {
    color: "#0077b6",
    fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
  },
  sectionH2: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 700,
    color: "#0d1b2a",
    textAlign: "center",
    marginBottom: 56,
    letterSpacing: "-0.5px",
  },

  /* contact */
  contactWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
    maxWidth: 980,
    margin: "0 auto",
  },
  contactLeft: {
    position: "relative",
    minHeight: 520,
  },
  contactImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contactImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,30,60,0.72) 0%, rgba(0,119,182,0.5) 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "40px 36px",
  },
  contactLeftH: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
  },
  contactLeftP: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    lineHeight: 1.7,
    fontFamily: "'Lato', sans-serif",
  },
  contactRight: {
    background: "#fff",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 26,
    color: "#0d1b2a",
    marginBottom: 6,
  },
  formSub: {
    color: "#999",
    fontSize: 13,
    marginBottom: 28,
    fontFamily: "'Lato', sans-serif",
  },
  inputWrap: { marginBottom: 16 },
  inputLabel: {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    color: "#aaa",
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "'Lato', sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e5e5e5",
    borderRadius: 4,
    fontSize: 14,
    color: "#0d1b2a",
    outline: "none",
    fontFamily: "'Lato', sans-serif",
    transition: "border-color .2s",
    boxSizing: "border-box",
    background: "#fafafa",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e5e5e5",
    borderRadius: 4,
    fontSize: 14,
    color: "#0d1b2a",
    outline: "none",
    fontFamily: "'Lato', sans-serif",
    resize: "vertical",
    minHeight: 110,
    boxSizing: "border-box",
    background: "#fafafa",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#0077b6",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Lato', sans-serif",
    marginTop: 8,
    transition: "background .2s",
  },
};

const slides = [CoolriteSlider, CoolriteSlider2, CoolriteSlider3];

const stats = [
  { num: "500+", label: "Projects Completed" },
  { num: "18+", label: "Years Experience" },
  { num: "200+", label: "Happy Clients" },
  { num: "24/7", label: "Support Available" },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", emailAddress: "", Phone: "", message: "",
  });

  /* auto-play */
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tp = {
      from_name: formData.name,
      from_email: formData.emailAddress,
      phone: formData.Phone,
      message: formData.message,
    };
    emailjs.send("service_g31h8cy", "template_lw7xkts", tp, "CdZQKISVQONA86P9K")
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", emailAddress: "", Phone: "", message: "" });
      })
      .catch(() => alert("Failed to send. Try again."));
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      {/* ── HERO CAROUSEL ── */}
      <div style={S.carouselWrap}>
        {slides.map((src, i) => (
          <div key={i} style={S.slide(i === current)}>
            <img src={src} alt={`Slide ${i + 1}`} style={S.img} />
            <div style={S.overlay} />
          </div>
        ))}

        {/* Caption */}
        <div style={S.caption}>
          <div style={S.tag}>HVAC &amp; MEP Engineering Solutions</div>
          <h1 style={S.h1}>
            CoolRite <span style={S.accent}>Engineers</span>
          </h1>
          <p style={S.sub}>High Performance HVAC Services for Industries &amp; Corporates</p>
          <div style={S.btnRow}>
            <button
              style={S.btnPrimary}
              onClick={() => navigate("/about")}
              onMouseEnter={(e) => (e.target.style.background = "#005f92")}
              onMouseLeave={(e) => (e.target.style.background = "#0077b6")}
            >
              About Us
            </button>
            <button
              style={S.btnOutline}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#0d1b2a";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button style={S.arrow("left")} onClick={prev}>‹</button>
        <button style={S.arrow("right")} onClick={next}>›</button>

        {/* Dots */}
        <div style={S.dots}>
          {slides.map((_, i) => (
            <button key={i} style={S.dot(i === current)} onClick={() => setCurrent(i)} />
          ))}
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={S.strip}>
        {stats.map((s, i) => (
          <div key={i} style={S.statBox}>
            <div style={S.statNum}>{s.num}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MEP INFO ── */}
      <div style={S.section("#fff")}>
        <div style={S.sectionInner}>
          <MepInfo />
        </div>
      </div>

      {/* ── OUR SERVICES ── */}
      <div style={S.section("#f4f7fb")}>
        <div style={S.sectionInner}>
          <div style={S.sectionEyebrow}>
            <div style={S.line} />
            <span style={S.eyebrowText}>What We Do</span>
            <div style={S.line} />
          </div>
          <h2 style={S.sectionH2}>Our Services</h2>
          <CardList />
        </div>
      </div>

      {/* ── CONTACT FORM ── */}
      <div style={S.section("#fff")}>
        <div style={S.sectionInner}>
          <div style={S.sectionEyebrow}>
            <div style={S.line} />
            <span style={S.eyebrowText}>Get In Touch</span>
            <div style={S.line} />
          </div>
          <h2 style={S.sectionH2}>Quick Enquiry</h2>

          <div style={S.contactWrap}>
            {/* Left image */}
            <div style={S.contactLeft}>
              <img src={GetInTouch} alt="Contact" style={S.contactImg} />
              <div style={S.contactImgOverlay}>
                <h3 style={S.contactLeftH}>Let's Build Something Great</h3>
                <p style={S.contactLeftP}>
                  Our engineering team is ready to help you design, install, and
                  maintain the perfect HVAC &amp; MEP system for your facility.
                </p>
              </div>
            </div>

            {/* Right form */}
            <div style={S.contactRight}>
              <h3 style={S.formTitle}>Send us a Message</h3>
              <p style={S.formSub}>We'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit}>
                {[
                  { id: "name", label: "Full Name", type: "text" },
                  { id: "emailAddress", label: "Email Address", type: "email" },
                  { id: "Phone", label: "Phone Number", type: "text" },
                ].map((f) => (
                  <div style={S.inputWrap} key={f.id}>
                    <label style={S.inputLabel}>{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      value={formData[f.id]}
                      onChange={handleChange}
                      required
                      style={S.input}
                      onFocus={(e) => (e.target.style.borderColor = "#0077b6")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                    />
                  </div>
                ))}

                <div style={S.inputWrap}>
                  <label style={S.inputLabel}>Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={S.textarea}
                    onFocus={(e) => (e.target.style.borderColor = "#0077b6")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                  />
                </div>

                <button
                  type="submit"
                  style={S.submitBtn}
                  onMouseEnter={(e) => (e.target.style.background = "#005f92")}
                  onMouseLeave={(e) => (e.target.style.background = "#0077b6")}
                >
                  Submit Enquiry →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUSTOMERS ── */}
      <div style={S.section("#f4f7fb")}>
        <div style={S.sectionInner}>
          <div style={S.sectionEyebrow}>
            <div style={S.line} />
            <span style={S.eyebrowText}>Our Clients</span>
            <div style={S.line} />
          </div>
          <h2 style={S.sectionH2}>Trusted By Industry Leaders</h2>
          <CustomerSlider />
        </div>
      </div>

      {/* ── CLIENT REVIEW IMAGE ── */}
      <div style={{
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
      }}>
        <img
          src={ClientImg}
          alt="Client Reviews"
          style={{
            width: "100%",
            display: "block",
            maxHeight: 480,
            objectFit: "cover",
            filter: "brightness(0.92)",
          }}
        />
      </div>
    </>
  );
};

export default Home;

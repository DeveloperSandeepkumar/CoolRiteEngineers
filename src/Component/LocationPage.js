import React from 'react';
import { useParams } from 'react-router-dom';
import { locationsData } from './locationsData';
import SEO from './SEO';
import ProposalFormWithMap from './ProposalFormWithMap';
import './LocationPage.css';
import { FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaTools, FaBuilding } from 'react-icons/fa';

const LocationPage = ({ locationId: propLocationId }) => {
  const { locationId: paramLocationId } = useParams();
  const activeSlug = propLocationId || paramLocationId || 'hvac-contractors-baddi-himachal';

  const data = locationsData[activeSlug] || locationsData['hvac-contractors-baddi-himachal'];

  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": `CoolRite Engineers - ${data.cityName}`,
    "description": data.metaDescription,
    "url": `https://www.coolriteengineers.com/locations/${data.slug}`,
    "telephone": "+91-7009167480",
    "areaServed": data.cityName,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.cityName,
      "addressRegion": data.stateName,
      "addressCountry": "IN"
    }
  };

  return (
    <div className="location-page-wrapper">
      <SEO 
        title={data.metaTitle}
        description={data.metaDescription}
        keywords={data.keywords}
        canonicalUrl={`https://www.coolriteengineers.com/locations/${data.slug}`}
        schema={schema}
      />

      {/* Hero Banner */}
      <section className="location-hero text-white">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="mb-3">
                <span className="location-hero-badge">
                  <FaMapMarkerAlt /> Top Rated HVAC Contractor in {data.cityName}, {data.stateName}
                </span>
              </div>
              <h1 className="location-hero-title mb-3">{data.heroHeading}</h1>
              <p className="location-hero-subtitle mb-4">{data.heroSubheading}</p>
              
              <div className="location-cta-group">
                <a href="#quote-form" className="btn btn-warning shadow-sm" style={{ background: "#f2ab26", borderColor: "#f2ab26", color: "#0A2540" }}>
                  Request Commercial Quote
                </a>
                <a href="tel:+917009167480" className="btn btn-outline-light">
                  <FaPhoneAlt /> Call Engineer
                </a>
                <a href="https://wa.me/917009167480" target="_blank" rel="noopener noreferrer" className="btn btn-success">
                  <FaWhatsapp /> WhatsApp Inquiry
                </a>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <div className="location-survey-card">
                <h4 className="fw-bold text-dark mb-2" style={{ color: "#0A2540" }}>Quick Site Survey</h4>
                <p className="small text-muted mb-3">
                  Need HVAC, Chiller, AHU, or Ducting in {data.cityName}? Book a free expert engineer site visit today.
                </p>
                <a href="#quote-form" className="btn btn-primary w-100 fw-bold py-2" style={{ background: "#0A2540", borderColor: "#0A2540" }}>
                  Get BOQ Estimate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Highlights & Trust Metrics */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Why CoolRite Engineers in {data.cityName}?</h2>
            <p className="text-muted fs-5">Delivering industrial precision, high energy efficiency & full compliance</p>
          </div>

          <div className="row g-4">
            {data.highlights.map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="location-feature-card">
                  <div className="d-flex align-items-start">
                    <FaCheckCircle className="text-success fs-4 me-3 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="fw-semibold mb-0" style={{ fontSize: "1.02rem", lineHeight: "1.5" }}>{item}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Areas Covered & Specialized Services */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <div className="location-sectors-box">
                <h3 className="fw-bold mb-3 fs-4"><FaBuilding className="me-2 text-warning" /> Industrial Sectors Covered</h3>
                <p className="small text-white-50 mb-3">We provide fast site inspections, installation crews, and 24/7 AMC support across:</p>
                <ul className="list-unstyled mb-0">
                  {data.industrialAreasCovered.map((area, index) => (
                    <li key={index} className="location-sector-item">
                      <FaMapMarkerAlt className="text-warning flex-shrink-0" />
                      <strong>{area}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-7">
              <h2 className="fw-bold text-dark mb-4 fs-3">
                <FaTools className="me-2 text-primary" /> Specialized Services in {data.cityName}
              </h2>
              <div className="row g-3">
                {data.servicesOffered.map((service, index) => (
                  <div className="col-12" key={index}>
                    <div className="location-service-card">
                      <h5 className="fw-bold mb-1" style={{ color: "#0A2540", fontSize: "1.05rem" }}>{service.name}</h5>
                      <p className="mb-0 text-muted small" style={{ lineHeight: "1.6" }}>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="fw-bold text-center mb-4 fs-3">Frequently Asked Questions ({data.cityName} HVAC)</h2>
            <div className="row justify-content-center">
              <div className="col-lg-9">
                {data.faqs.map((faq, index) => (
                  <div className="card location-faq-card border-0 p-3" key={index}>
                    <div className="card-body p-2">
                      <h5 className="fw-bold text-dark mb-2" style={{ fontSize: "1.02rem" }}>Q: {faq.question}</h5>
                      <p className="text-secondary mb-0 small" style={{ lineHeight: "1.6" }}>A: {faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Form Section */}
      <section id="quote-form" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Get Free Quote for {data.cityName} Projects</h2>
            <p className="text-muted">Fill in your requirements below for a detailed Bill of Quantities (BOQ) and site inspection.</p>
          </div>
          <ProposalFormWithMap />
        </div>
      </section>
    </div>
  );
};

export default LocationPage;

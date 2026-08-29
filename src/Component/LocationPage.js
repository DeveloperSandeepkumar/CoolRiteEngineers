import React from 'react';
import { useParams } from 'react-router-dom';
import { locationsData } from './locationsData';
import SEO from './SEO';
import ProposalFormWithMap from './ProposalFormWithMap';
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
      <section className="bg-primary text-white py-5 px-3" style={{ background: "linear-[#0A2540], #13395E)", minHeight: "380px" }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 fs-6">
                <FaMapMarkerAlt className="me-2" /> Top Rated HVAC Contractor in {data.cityName}, {data.stateName}
              </span>
              <h1 className="display-5 fw-bold mb-3">{data.heroHeading}</h1>
              <p className="lead mb-4 opacity-90">{data.heroSubheading}</p>
              
              <div className="d-flex flex-wrap gap-3">
                <a href="#quote-form" className="btn btn-warning btn-lg fw-semibold shadow-sm">
                  Request Commercial Quote
                </a>
                <a href="tel:+917009167480" className="btn btn-outline-light btn-lg fw-semibold">
                  <FaPhoneAlt className="me-2" /> Call Engineer
                </a>
                <a href="https://wa.me/917009167480" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg fw-semibold">
                  <FaWhatsapp className="me-2" /> WhatsApp Inquiry
                </a>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block text-center">
              <div className="p-4 bg-white text-dark rounded shadow-lg border border-3 border-warning">
                <h4 className="fw-bold text-primary mb-3">Quick Site Survey</h4>
                <p className="small text-muted mb-3">Need HVAC or Ducting in {data.cityName}? Book an expert engineer site visit today.</p>
                <a href="#quote-form" className="btn btn-primary w-100 fw-bold py-2">Get Price Estimate</a>
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
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="d-flex align-items-start">
                    <FaCheckCircle className="text-success fs-3 me-3 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="fw-semibold mb-2">{item}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Areas Covered */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="p-4 bg-primary text-white rounded shadow-sm">
                <h3 className="fw-bold mb-3"><FaBuilding className="me-2" /> Industrial Sectors Covered</h3>
                <p>We provide quick site visits, installation teams, and ongoing AMC support across all industrial sectors in {data.regionTitle}:</p>
                <ul className="list-unstyled">
                  {data.industrialAreasCovered.map((area, index) => (
                    <li key={index} className="py-2 border-bottom border-light d-flex align-items-center">
                      <FaMapMarkerAlt className="text-warning me-2" /> <strong>{area}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-7 ps-lg-4">
              <h2 className="fw-bold text-dark mb-4"><FaTools className="me-2 text-primary" /> Specialized Services Offered in {data.cityName}</h2>
              <div className="row g-3">
                {data.servicesOffered.map((service, index) => (
                  <div className="col-12" key={index}>
                    <div className="p-3 rounded border bg-light">
                      <h5 className="fw-bold text-primary mb-1">{service.name}</h5>
                      <p className="mb-0 text-muted">{service.description}</p>
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
            <h2 className="fw-bold text-center mb-4">Frequently Asked Questions ({data.cityName} HVAC)</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                {data.faqs.map((faq, index) => (
                  <div className="card mb-3 border-0 shadow-sm" key={index}>
                    <div className="card-body p-4">
                      <h5 className="fw-bold text-dark mb-2">Q: {faq.question}</h5>
                      <p className="text-secondary mb-0">A: {faq.answer}</p>
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

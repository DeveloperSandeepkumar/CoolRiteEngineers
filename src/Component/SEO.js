import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "CoolRite Engineers (Colrite) | AC Ducting, HVAC & MEP Services",
  description = "CoolRite Engineers provides expert AC ducting, HVAC insulation, AHU systems, ventilation, and MEP services across Baddi, Himachal Pradesh, Chandigarh, Mohali, Panchkula, and Punjab.",
  keywords = "CoolRite Engineers, HVAC Baddi, AC ducting Baddi, AHU ventilation system Baddi, MEP contractors Baddi, HVAC Chandigarh, industrial ducting Punjab",
  canonicalUrl = "https://www.coolriteengineers.com",
  ogType = "website",
  ogImage = "https://www.coolriteengineers.com/MainLogo.png",
  schema = null
}) => {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "CoolRite Engineers",
    "alternateName": ["Cool Rite Engineers", "Colrite Engineers"],
    "image": "https://www.coolriteengineers.com/MainLogo.png",
    "url": "https://www.coolriteengineers.com",
    "telephone": "+91-7009167480",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Baddi",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "173205",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.9578,
      "longitude": 76.7914
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "areaServed": [
      "Baddi",
      "Nalagarh",
      "Barotiwala",
      "Solan",
      "Parwanoo",
      "Kala Amb",
      "Himachal Pradesh",
      "Chandigarh",
      "Mohali",
      "Panchkula",
      "Punjab"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HVAC & MEP Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial AC Ducting & Insulation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Air Handling Unit (AHU) Installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "VRV / VRF & Chiller Systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MEP Engineering & Fire Fighting"
          }
        }
      ]
    }
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CoolRite Engineers" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;

import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./ContactButtons.css";

const ContactButtons = () => {
  const phoneNumber = "917009167480"; // include country code
  const whatsappMessage = "Hello, I want to connect with you!";

  return (
    <div className="contact-buttons">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
      >
        <FaWhatsapp />
      </a>

      {/* Phone */}
      <a href={`tel:+${phoneNumber}`} className="phone">
        <FaPhone />
      </a>
    </div>
  );
};

export default ContactButtons;
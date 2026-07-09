import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, link, delayClass }) => {
  return (
    <div className={`service-card reveal reveal-up ${delayClass || ''}`}>
      <div className="service-card-image-wrapper">
        <img 
          src={image} 
          alt={title} 
          className="service-card-image"
        />
      </div>
      <h3 className="service-card-title">{title}</h3>
      <Link to={link} className="service-card-btn">
        Learn More
      </Link>
    </div>
  );
};

export default Card;

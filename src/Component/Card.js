import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered
          ? 'var(--shadow-lg)'
          : 'var(--shadow-sm)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img 
          src={image} 
          alt={title} 
          style={{
            ...styles.image,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }} 
        />
      </div>
      <h3 style={styles.title}>{title}</h3>
      <Link
        to={link}
        style={{
          ...styles.button,
          backgroundColor: isHovered ? 'var(--hvac-blue)' : 'transparent',
          color: isHovered ? '#fff' : 'var(--primary-navy)',
          borderColor: isHovered ? 'var(--hvac-blue)' : 'var(--border-color)',
        }}
      >
        Learn More
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    width: '360px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    margin: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'var(--card-bg)',
    transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '220px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--primary-navy)',
    margin: '0 0 16px 0',
    fontFamily: "'Outfit', sans-serif",
  },
  button: {
    display: 'inline-block',
    padding: '8px 24px',
    border: '1px solid',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all var(--transition-fast)',
    cursor: 'pointer',
    width: '80%',
    textAlign: 'center',
  },
};

export default Card;

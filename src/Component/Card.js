import React, { useState } from 'react';

const Card = ({ image, title, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered
          ? '0 8px 20px rgba(0,0,0,0.2)'
          : '0 2px 5px rgba(0,0,0,0.1)',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} style={styles.image} />
      <h3 style={styles.title}>{title}</h3>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#000';
          e.target.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#fff';
          e.target.style.color = '#000';
        }}
      >
        Learn More
      </a>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '400px',
    padding: '16px',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '1.5rem',
    margin: '12px 0',
    color: '#2c3e50',
    fontWeight: '600',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  button: {
    display: 'inline-block',
    padding: '5px 40px',
    backgroundColor: '#fff',
    color: '#000',
    border: '2px solid #000',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
};

export default Card;

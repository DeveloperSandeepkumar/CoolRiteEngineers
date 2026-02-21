// CarouselComponent.jsx
import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const CarouselComponent = () => {
  return (
    <div className="container mt-4">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://via.placeholder.com/1200x400?text=Slide+1" className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Welcome to Our Site</h5>
              <p>Learn more about us or contact us directly.</p>
              <div>
                <a href="#about" className="btn btn-primary me-2">About Us</a>
                <a href="#contact" className="btn btn-outline-light">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/1200x400?text=Slide+2" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/1200x400?text=Slide+3" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;

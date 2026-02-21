import React from 'react';
import Mep from '../Assets/Mep.jpg';
import '../Component/Mep.css'; // Link to external CSS

const MepInfo = () => {
  return (
    <div className="container my-5 py-4 border rounded shadow-sm bg-light">
      <div className="row align-items-center">
        {/* Text Column - Order First on Mobile */}
        <div className="col-md-6 order-1 order-md-0">
          <h2 className="mb-3 text-primary">About Us</h2>
          <h5 className="mb-3 fw-semibold">
            MEP Consultancy With No Delays &amp; Errors
          </h5>
          <p className="text-muted" style={{ lineHeight: '1.7' }}>
            Our MEP consultants leverage advanced automation software to deliver accurate MEP drawings and precise BOQs that fully comply with local building codes. We oversee site supervision, conduct quality checks, assist with NOC approvals and environmental clearance meetings, and support contractor selection to ensure your project's success from start to finish.
          </p>

          {/* Read More Button */}
          <a href="/about" className="btn custom-read-more mt-3">
            Read More
          </a>
        </div>

        {/* Image Column - Order Second on Mobile */}
        <div className="col-md-6 order-0 order-md-1 mb-4 mb-md-0">
          <img
            src={Mep}
            alt="MEP Consultancy"
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MepInfo;

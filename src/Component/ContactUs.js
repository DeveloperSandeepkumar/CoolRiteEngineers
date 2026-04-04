{/* Our Location Section */}
<div className="container my-5">
  <h2 className="text-center mb-4" style={{
    fontWeight: '700',
    fontSize: '2rem',
    color: '#222',
    letterSpacing: '1px',
  }}>
    Our Location
  </h2>

  <p className="text-center mb-4" style={{ color: '#555', fontSize: '1rem' }}>
    Find our head office and branch office locations on the map below.
  </p>

  <div className="ratio ratio-16x9 shadow rounded">
    <iframe
      title="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.813817872341!2d76.7758831!3d30.9455745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff57de71ccde7%3A0xb513973c84f8c7e0!2sGoogle+Maps+Location!5e0!3m2!1sen!2sin!4v1700000000000"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

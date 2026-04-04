{/* Carousel */}
<div id="carouselExampleControls" className="carousel slide overlay" data-bs-ride="carousel">
  <div className="carousel-inner">

    {/* Slide 1 */}
    <div className="carousel-item active">
      <div className="dark-img">
        <img src={CoolriteSlider} className="d-block w-100" alt="Slide 1" />
      </div>

      <div className="carousel-caption custom-caption">
        <h1 className="carousel-heading">CoolRite Engineers</h1>
        <h5 className="carousel-subheading">High Performance Service For Industries</h5>

        <div className="button-group">
          <button className="button-modern" onClick={() => navigate("/about")}>
            About Us
          </button>

          {showAbout && <AboutUs />}

          <button className="button-modern">Contact Us</button>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="carousel-item">
      <div className="dark-img">
        <img src={CoolriteSlider2} className="d-block w-100" alt="Slide 2" />
      </div>

      {/* ✅ ADD KIYA */}
      <div className="carousel-caption custom-caption">
        <h1 className="carousel-heading">CoolRite Engineers</h1>
        <h5 className="carousel-subheading">High Performance Service For Industries</h5>

        <div className="button-group">
          <button className="button-modern" onClick={() => navigate("/about")}>
            About Us
          </button>

          <button className="button-modern">Contact Us</button>
        </div>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="carousel-item">
      <div className="dark-img">
        <img src={CoolriteSlider3} className="d-block w-100" alt="Slide 3" />
      </div>

      {/* ✅ ADD KIYA */}
      <div className="carousel-caption custom-caption">
        <h1 className="carousel-heading">CoolRite Engineers</h1>
        <h5 className="carousel-subheading">High Performance Service For Industries</h5>

        <div className="button-group">
          <button className="button-modern" onClick={() => navigate("/about")}>
            About Us
          </button>

          <button className="button-modern">Contact Us</button>
        </div>
      </div>
    </div>

  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>

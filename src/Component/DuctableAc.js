import React from "react";
import cd from "../Assets/CD.jpg"; // Banner image
import Image2 from "../../src/Assets/Colrite_files/2.jpg"; // Ductable AC related image

const DuctableAC = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="dark-img">
        <img src={cd} alt="Ductable AC" style={{ height: "400px", width: "100%" }} />
      </div>

      <div
        className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center"
        style={{ top: 0, bottom: 0 }}
      >
        <h1><b>Ductable AC</b></h1>
        <h5 className="C-text"><b>CoolRite Engineers</b></h5>
      </div>

      {/* Service Description Section */}
      <div className="Get_touch">
        <div className="container-fluid px-4 my-4">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="border-0 rounded-3 shadow-lg overflow-hidden">
                <div className="card-body p-4">

                  <p style={{ textAlign:"left", fontSize: "25px" }}>
                    Ductable AC Services
                  </p>

                  <p style={{ textAlign: "left"}}>
                    Ductable AC Services provide efficient and flexible air conditioning
                    solutions for commercial and large residential spaces. Our experts
                    design, install, and maintain ductable systems to ensure optimal
                    performance and comfort.
                  </p>

                  <p style={{ textAlign: "left"}}><b>What You Get:</b></p>

                  <ul style={{ textAlign: "left"}}>
                    <li>Custom duct design for your space</li>
                    <li>Proper system installation and balancing</li>
                    <li>Performance testing and airflow optimization</li>
                    <li>Maintenance and guidance for long-term efficiency</li>
                  </ul>

                  <p style={{ textAlign: "left"}}>
                    Professional installation ensures consistent cooling, energy efficiency,
                    and long-lasting performance of your ductable AC system.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="Get_touch">
        <div className="container-fluid px-4 my-4">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="border-0 rounded-3 shadow-lg overflow-hidden">
                <div className="card-body p-0">
                  <div className="row g-0">

                    <div className="col-sm-6 d-none d-sm-block">
                      <img
                        src={Image2}
                        alt="Ductable AC Service"
                        style={{ width: "100%", height: "100%", padding: "3%" }}
                      />
                    </div>

                    <div className="col-sm-6 p-4">
                      <div className="text-center">
                        <h4 style={{ color: "brown" }}>Quick Enquiry</h4>
                        <hr />
                        <p style={{ fontSize: "14px" }}>
                          Complete control over products allows us to ensure our customers
                          receive the best quality, prices, and service.
                        </p>
                      </div>

                      <form>
                        <div className="form-floating mb-3">
                          <input className="form-control" type="text" placeholder="Name" />
                          <label htmlFor="name">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input className="form-control" type="email" placeholder="Email Address" />
                          <label htmlFor="email">Email Address</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input className="form-control" type="text" placeholder="Phone" />
                          <label htmlFor="phone">Phone</label>
                        </div>

                        <div className="form-floating mb-3">
                          <textarea className="form-control" placeholder="Message"></textarea>
                          <label htmlFor="message">Message</label>
                        </div>

                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" style={{background:'#242472'}} type="submit">
                            Submit
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuctableAC;
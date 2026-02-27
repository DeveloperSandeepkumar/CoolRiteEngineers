import React from "react";
import cd from "../Assets/CD.jpg"; // Banner image
const ProposalFormWithMap = () => {

  return (
       <>
       <div className="dark-img">
        <img src={cd} alt="AC Installation" style={{ height: "400px", width: "100%" }} />
      </div>

      <div
        className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center"
        style={{ top: 0, bottom: 0 }}
      >
        <h1><b>Request Proposal For New Project</b></h1>
        <h5 className="C-text"><b>CoolRite Engineers</b></h5>
      </div>
    <div className="container-fluid py-5" style={{ background: "#f8f9fa" }}>
      <div className="row justify-content-center">
    
        <div className="col-xl-11">
          <div className="row shadow-lg bg-white rounded-3 overflow-hidden">

            {/* LEFT SIDE – FORM */}
            <div className="col-lg-6 p-5">
              <h2 style={{ fontWeight: "700" }}>
                Request Proposal For New Project
              </h2>
              <p className="text-muted mb-4">
                MEP engineering service with no delays and errors
              </p>

              <form>
                <div className="mb-3">
                  <label className="form-label" style={{float:'left'}}>* Name</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{float:'left'}}>* Email Address</label>
                  <input type="email" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{float:'left'}}>* Phone Number</label>
                  <input type="tel" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{float:'left'}}>* Project Size (in sq. ft.)</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{float:'left'}}>* Project Location</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-4">
                  <label className="form-label" style={{float:'left'}}>Type of Project</label>
                  <select className="form-select">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Hospitality</option>
                    <option>Institutional</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100"
                  style={{ background: "#242472", color: "#fff" }}
                >
                  Submit Proposal Request
                </button>
              </form>
            </div>

            {/* RIGHT SIDE – MAP */}
            <div className="col-lg-6 p-0">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.813817872341!2d76.7758831!3d30.9455745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff57de71ccde7%3A0xb513973c84f8c7e0!2sGoogle+Maps+Location!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProposalFormWithMap;
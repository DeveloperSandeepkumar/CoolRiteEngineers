import React, { useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import emailjs from 'emailjs-com';

import ClientImg from '../Assets/Client.jpg';
import CoolriteSlider from '../Assets/CoolriteSlider.jpeg';
import CoolriteSlider2 from '../Assets/CoolRiteSlider2.jpg';
import CoolriteSlider3 from '../Assets/CoolRiteSlider3.jpg';

import CardList from '../Component/OurServiceDetails.js';
import AboutUs from "./AboutUs.js";
import '../Component/Home.css';
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
import GetInTouch from '../Assets/GetInTouch.jpg';

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    Phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.emailAddress,
      phone: formData.Phone,
      message: formData.message,
    };

    emailjs.send(
      "service_g31h8cy",
      "template_lw7xkts",
      templateParams,
      "CdZQKISVQONA86P9K"
    )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          emailAddress: "",
          Phone: "",
          message: ""
        });
      })
      .catch(() => {
        alert("Failed to send message. Try again.");
      });
  };

  return (
    <>
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

      {/* Sections */}
      <MepInfo />
      <CardList />

      {/* Contact Form */}
      <div className="Get_touch">
        <div className="container-fluid px-4 my-4">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="border-0 rounded-3 shadow-lg overflow-hidden">
                <div className="card-body p-0">
                  <div className="row g-0">

                    <div className="col-sm-6 d-none d-sm-block bg-image">
                      <img src={GetInTouch} style={{ width: '600px', height: '500px', padding: '3%' }} alt="" />
                    </div>

                    <div className="col-sm-6 p-4">
                      <div className="text-center">
                        <h4 style={{ color: 'brown' }}>Quick Enquiry</h4>
                        <hr />
                      </div>

                      <form onSubmit={handleSubmit}>

                        <div className="form-floating mb-3">
                          <input className="form-control" id="name" type="text"
                            value={formData.name} onChange={handleChange} required />
                          <label>Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input className="form-control" id="emailAddress" type="email"
                            value={formData.emailAddress} onChange={handleChange} required />
                          <label>Email Address</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input className="form-control" id="Phone" type="text"
                            value={formData.Phone} onChange={handleChange} required />
                          <label>Phone</label>
                        </div>

                        <div className="form-floating mb-3">
                          <textarea className="form-control" id="message"
                            value={formData.message} onChange={handleChange} required />
                          <label>Message</label>
                        </div>

                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" type="submit" style={{ background: 'green' }}>
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

      <CustomerSlider />

      <div className="ClientReviw">
        <img src={ClientImg} className="ClientReviwImg" alt="" />
      </div>
    </>
  );
};

export default Home;

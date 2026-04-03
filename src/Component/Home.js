import React, { useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import emailjs from 'emailjs-com';

import CoolriteSlider from '../Assets/CoolriteSlider.jpeg';
import CoolriteSlider2 from '../Assets/CoolRiteSlider2.jpg';
import CoolriteSlider3 from '../Assets/CoolRiteSlider3.jpg';
import ClientImg from '../Assets/Client.jpg';
import GetInTouch from '../Assets/GetInTouch.jpg';

import CardList from '../Component/OurServiceDetails.js';
import AboutUs from "./AboutUs.js";
import '../Component/Home.css';
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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

          <div className="carousel-item active">
            <img src={CoolriteSlider} className="d-block w-100" alt="Cooling system" />
            <div className="carousel-caption">
              <h1>CoolRite Engineers</h1>
              <h5>High Performance Service For Industries</h5>
              <button onClick={() => navigate("/about")}>About Us</button>
            </div>
          </div>

          <div className="carousel-item">
            <img src={CoolriteSlider2} className="d-block w-100" alt="HVAC work" />
          </div>

          <div className="carousel-item">
            <img src={CoolriteSlider3} className="d-block w-100" alt="Industrial cooling" />
          </div>

        </div>
      </div>

      <MepInfo />
      <CardList />

      {/* Contact */}
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <input id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input id="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Email" required />
          <input id="Phone" value={formData.Phone} onChange={handleChange} placeholder="Phone" required />
          <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
          <button type="submit">Submit</button>
        </form>
      </div>

      <CustomerSlider />

      <img src={ClientImg} alt="Client reviews" />
    </>
  );
};

export default Home;

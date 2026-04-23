import React from "react";
import { NavLink } from 'react-router-dom'
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaPhoneAlt, FaLongArrowAltRight, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { services } from "../Component/servicesData";

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted footer">
            <section className="bg-dark text-white">
                <div className="container text-center text-md-start mt-4 textdiv">
                    <div className="row mt-3">

                        {/* Top Heading */}
                        <div className="col-12 mb-3">
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                Most Innovative MEP Consultants
                            </p>
                            <p style={{ fontSize: '13px' }}>
                                MEP consultancy with no delays & errors
                            </p>
                            <hr />
                        </div>

                        {/* Contact */}
                        <div className="col-md-4 col-lg-4 mb-3">
                            <h6 className="text-uppercase fw-bold mb-3 textHeading">
                                Quick Contact
                            </h6>

                            <p className="textclass">
                                <FaPhoneAlt /> +91-7009167480 <br />
                                <FaPhoneAlt /> +91-7973418255
                            </p>

                            <p className="textclass">
                                <FaEnvelope /> Coolriteengineers@gmail.com
                            </p>

                            <p className="textclass" style={{ fontSize: '13px' }}>
                                <FaMapMarkerAlt /> SCO NO - 03 Village Malpur Upperla <br />
                                Near Cipla Ltd., P.O Bhud, Baddi <br />
                                Distt Solan (HP - 173205)
                            </p>
                        </div>

                        {/* Company Links */}
                        <div className="col-md-4 col-lg-4 mb-3">
                            <h6 className="text-uppercase fw-bold mb-3 textHeading">
                                Company
                            </h6>

                            <p><FaLongArrowAltRight /> <NavLink to="/" className="text_Style">Home</NavLink></p>
                            <p><FaLongArrowAltRight /> <NavLink to="/About" className="text_Style">About</NavLink></p>
                            <p><FaLongArrowAltRight /> <NavLink to="/Project" className="text_Style">Projects</NavLink></p>
                            <p><FaLongArrowAltRight /> <NavLink to="/Career" className="text_Style">Career</NavLink></p>
                            <p><FaLongArrowAltRight /> <NavLink to="/ContactUs" className="text_Style">Contact Us</NavLink></p>
                        </div>

                        {/* Services (NEW) */}
                        <div className="col-md-4 col-lg-4 mb-3">
                            <h6 className="text-uppercase fw-bold mb-3 textHeading">
                                MEP Services
                            </h6>

                            {services.slice(0, 6).map((service, index) => (
                                <p key={index}>
                                    <FaLongArrowAltRight />{" "}
                                    <NavLink to={service.path} className="text_Style">
                                        {service.title}
                                    </NavLink>
                                </p>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom */}
            <div className="text-center p-3" style={{ fontSize: '13px' }}>
                © {new Date().getFullYear()} Copyright:
                <a className="text-reset fw-bold ms-1" href="https://CoolRiteEngineers.com/">
                    CoolRiteEngineers.com
                </a>
            </div>
        </footer>
    );
}

export default Footer;

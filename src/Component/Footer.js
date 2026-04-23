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
                <div className="container text-center text-md-start mt-5 textdiv">
                    <div className="row mt-3">

                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            Most Innovative MEP Consultants.
                        </p>
                        <p>MEP consultancy with no delays & errors</p>
                        <hr />

                        {/* Contact */}
                        <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Quick Contact
                            </h6>

                            <p className="textStyle">
                                <FaPhoneAlt /> +91-7009167480 / +91-7973418255
                            </p>

                            <p className="textclass">
                                <FaEnvelope /> Coolriteengineers@gmail.com
                            </p>

                            <p className="textclass">
                                <FaMapMarkerAlt /> SCO NO - 03 Village Malpur Upperla <br />
                                Near Cipla Ltd. P.O Bhud, Baddi <br />
                                Distt Solan (HP -173205)
                            </p>         
                        </div>

                        {/* Company */}
                        <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Company
                            </h6>

                            <p className="textStyle">
                                <FaLongArrowAltRight /> <NavLink to="/" className="text_Style">Home</NavLink>
                            </p>

                            <p className="textStyle">
                                <FaLongArrowAltRight /> <NavLink to="/About" className="text_Style">About</NavLink>
                            </p>

                            <p className="textStyle">
                                <FaLongArrowAltRight /> <NavLink to="/Project" className="text_Style">Projects</NavLink>
                            </p>

                            <p className="textStyle">
                                <FaLongArrowAltRight /> <NavLink to="/Career" className="text_Style">Career</NavLink>
                            </p>

                            <p className="textStyle">
                                <FaLongArrowAltRight /> <NavLink to="/ContactUs" className="text_Style">Contact Us</NavLink>
                            </p>
                        </div>

                        {/* Services (NEW ADDED) */}
                        <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                MEP Services
                            </h6>

                            {services.slice(0, 6).map((service, index) => (
                                <p key={index} className="textStyle">
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

            <div className="text-center p-3">
                © {new Date().getFullYear()} Copyright:
                <a className="text-reset fw-bold" href="https://CoolRiteEngineers.com/">
                    CoolRiteEngineers.com
                </a>
            </div>
        </footer>
    );
}

export default Footer;

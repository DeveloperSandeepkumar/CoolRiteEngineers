import React from "react";
import { NavLink } from 'react-router-dom'
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaPhoneAlt, FaLongArrowAltRight } from "react-icons/fa";

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

                        <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-6">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Quick Contact
                            </h6>

                            <p className="textclass">
                                If you have any questions, feel free to contact our team.
                            </p>

                            <p className="textStyle">
                                <FaPhoneAlt /> +91-7009167480 / +91-7973418255
                            </p>

                            <p className="textclass">
                                <b>Email:</b>{" "}
                                <span className="textStyle">
                                   Coolriteengineers@gmail.com
                                </span>
                            </p>

                            <h4 className="textHeading">Head Office</h4>
                            <p className="textclass">
                               Address:- SCO NO - 03 Village Malpur Upperla near Cipla Ltd. P.O Bhud , Teh Baddi Distt Solan (Himachal Pradesh -173205)
                            </p>         
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-3">
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
                                <FaLongArrowAltRight /> <NavLink to="/Contact" className="text_Style">Contact Us</NavLink>
                            </p>
                        </div>

               

                    </div>
                </div>
            </section>

            <div className="text-center p-4">
                © 2025 Copyright:
                <a className="text-reset fw-bold" href="https://CoolRiteEngineers.com/">
                    CoolRiteEngineers.com
                </a>
            </div>
        </footer>
    );
}

export default Footer;

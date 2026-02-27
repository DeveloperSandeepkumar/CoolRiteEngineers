import React from "react";
import { NavLink } from 'react-router-dom'
import './Footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/bootstrap-icons.svg'
import { FcPhone, FcRight } from "react-icons/fc";
import { FaPhoneAlt,FaLongArrowAltRight} from "react-icons/fa";
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/vimeo'
const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            <section className="bg-dark text-white">
                <div className="container text-center text-md-start mt-5 textdiv">
                    <div className="row mt-3">
                   <p style={{fontSize:'24px',fontWeight:'bold'}}>Most Innovative MEP Consultants.</p> 
<p>MEP consultancy with no delays & errors</p>
<hr></hr>
                        <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-6">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Quick Contact
                            </h6>
                            <p className="textclass"> If you have any questions or need help, feel free to contact with our team.</p>
                            <p className="textStyle"><FaPhoneAlt />+91-7009167480 +91-8194839585</p>
                            {/* <p className="textclass"><b>Email 1: </b> <span className="textStyle">Sandeep</span></p> */}
                            <p className="textclass"><b>Email 2: </b> <span className="textStyle">accounts@Coolriteengineers.in</span></p>
                            <p className="textclass"><b>Email 3: </b> <span className="textStyle">Coolriteengineers@gmail.com</span></p>
                            <h4 className="textHeading"> Head Office</h4>
                            <p className="textclass"> Gulabgarh road Gill Calony Sec -09 Building No-361 Derabassi Distt SAS Nagar Mohali Pin Code 140507 Punjab</p><br />
                            <h4 className="textHeading"> Branch Office</h4>
                            <p className="textclass"> Village - Malpur teh Baddi Distt solan Himachal Pradesh</p><br />  
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Company
                            </h6>
                            <p className="textStyle">
                            <FaLongArrowAltRight />&nbsp;<NavLink to="/app" className="text_Style">Home</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight />&nbsp;<NavLink to="/About" className="text_Style">About</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight  />&nbsp;<NavLink to="/Career" className="text_Style">Career</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight  />&nbsp;<NavLink to="/Contact" className="text_Style">Contact Us</NavLink>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-3">
                            <h6 className="text-uppercase fw-bold mb-4 textHeading">
                                Our products
                            </h6>
                            <p className="textStyle">
                            <FaLongArrowAltRight  />&nbsp;<NavLink to="/Rectangular" className="text_Style">Rectangular G.I Duct</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight  />&nbsp;<NavLink to="/Circular" className="text_Style">Circular G.I Duct</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight  /> &nbsp;<NavLink to="/Steam" className="text_Style">Steam Pipe Insulation</NavLink>
                            </p>
                            <p className="textStyle">
                            <FaLongArrowAltRight  />&nbsp;<NavLink to="/Cold" className="text_Style">Cold Pipe Insulation</NavLink>
                            </p>
                              <p className="textStyle">
                              <FaLongArrowAltRight  />&nbsp;<NavLink to="/Reactor" className="text_Style">Reactor & Tank Insulation</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4">
                © 2025 Copyright:
                <a className="text-reset fw-bold" href="https://CoolRiteEngineers.com/">CoolRiteEngineers.com</a>
            </div>
        </footer>
    );
}

export default Footer;
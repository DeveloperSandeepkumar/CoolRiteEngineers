import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import { FaMapMarkerAlt, FaRegClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; // For internal navigation
import Logo from '../Assets/logo.png';
import '../Component/MainHeader.css';

const MainHeader = () => {
    return (
        <>
            <div className='top-header-wrapper mainNavbar'>
                <div className="container-fluid">
                    <div className="row d-flex align-items-center">

                        {/* LEFT SIDE: Address */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className='top-header-left d-flex align-items-center'>
                                <p className='mainpara mb-0'>
                                    <FaMapMarkerAlt /> Work : Baddi, Mallpur Road, Solan, Industrial Area, Punjab - 140507
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Office Hours, Social Icons, Request Proposal Button */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className='top-header-right d-flex align-items-center'>

                                {/* Office Hours */}
                                <p className='schedule mb-0 me-3'>
                                    <FaRegClock /> Office Hours: 9:00 AM to 6:00 PM
                                </p>

                                {/* Social Icons */}
                                <ul className='top-social d-flex mb-0'>
                                    <li><a href="#" className='SocilIcon'><FaFacebook /></a></li>
                                    <li><a href="#" className='SocilIcon'><FaTwitter /></a></li>
                                    <li><a href="#" className='SocilIcon'><FaInstagram /></a></li>
                                </ul>

                                {/* Request Proposal Button – React Router NavLink */}
                                <NavLink style={{background:'#f2ab26'}}
                                    to="/ProposalFormWithMap"
                                    className="btn btn-default ms-3 requestProposal"
                                >
                                    Request Proposal
                                </NavLink>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default MainHeader;
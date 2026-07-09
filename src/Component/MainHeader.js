import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { FaMapMarkerAlt, FaRegClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../Component/MainHeader.css';

const MainHeader = () => {
    return (
        <>
            <div className='top-header-wrapper mainNavbar'>
                <div className="container-fluid">
                    <div className="row d-flex align-items-center">

                        {/* LEFT SIDE */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <p className='mainpara mb-0'>
                                <FaMapMarkerAlt /> Work :  SCO NO - 03 Village Malpur Upperla
Near Cipla Ltd. P.O Bhud, Baddi
Distt Solan (HP -173205)
                            </p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className='d-flex align-items-center'>

                                <p className='schedule mb-0 me-3'>
                                    <FaRegClock /> Office Hours: 9:00 AM to 6:00 PM
                                </p>

                                {/* ✅ FIXED LINKS */}
                                <ul className='top-social d-flex mb-0'>
                                    <li>
                                        <a href="https://facebook.com" className='SocilIcon' target="_blank" rel="noreferrer">
                                            <FaFacebook />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com" className='SocilIcon' target="_blank" rel="noreferrer">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://instagram.com" className='SocilIcon' target="_blank" rel="noreferrer">
                                            <FaInstagram />
                                        </a>
                                    </li>
                                </ul>

                                <NavLink
                                    style={{ background: '#f2ab26' }}
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

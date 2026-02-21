import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa'; // Clock icon from Font Awesome

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai'; // Clock icon from Ant Design
import { IoMdTime } from 'react-icons/io';
import Logo from '../Assets/logo.png';
import '../Component/MainHeader.css'
const MainHeader = () => {
    return (
        <>

<div className='top-header-wrapper  mainNavbar'>
    <div className="container-fluid">
        <div className="row d-flex align-items-center">
            <div className="col-md-6 d-flex justify-content-center">
                <div className='top-header-left d-flex align-items-center'>
                    <p className='mainpara mb-0'><FaMapMarkerAlt /> Work : Baddi, Mallpur Road, Solan, Industrial Area, Punjab - 140507</p>
                </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
                <div className='top-header-right d-flex align-items-center'>
                    <p className='schedule mb-0 me-3'><FaRegClock /> Office Hours: 9:00 AM to 6:00 PM</p>
                    <ul className='top-social d-flex mb-0'>
                        <li><a href="#" className='SocilIcon'><FaFacebook /></a></li>
                        <li><a href="#" className='SocilIcon'><FaTwitter /></a></li>
                        <li><a href="#" className='SocilIcon'><FaInstagram /></a></li>
                    </ul>
                    <a className="btn btn-default ms-3 requestProposal" href="request-proposal.php" role="button">Request Proposal</a>
                </div>
            </div>
        </div>
    </div>
</div>


{/*          
            <div className='top-header-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                        <div className='top-header-left'>
                       <p className='mainpara'><FaMapMarkerAlt/>  Work : Baddi, Mallpur Road, Solan, Industrial Area, Punjab - 140507</p>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className='top-header-right'>
                       
                    
                        <p className='schedule'><FaRegClock/>  Office Hours:  9:00 AM to 6:00 AM
                                <a href="#"><FaFacebook/></a>
                                <a href="#"><FaTwitter/></a>
                                <a href="#"><FaInstagram/></a>
                                <a className="btn btn-default" href="request-proposal.php" role="button">Request Proposal</a>
                                </p>
                         
                        </div>        
                        </div>
                       
                    </div>
                </div>
                </div> */}
       
        </>
    );
}

export default MainHeader;
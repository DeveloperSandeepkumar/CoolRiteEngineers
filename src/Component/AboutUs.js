import React from "react";
import AboutUsPic from '../Assets/AboutUs.jpg';
import MepInfo from '../Component/Mep';

const AboutUs = () => {
    return (
        <>
            {/* Banner Image */}
            <div className="dark-img">
                <img 
                    src={AboutUsPic} 
                    style={{ height: '400px', width: '100%' }} 
                    alt="About CoolRite Engineers"
                />
            </div>

            {/* Overlay Text */}
            <div
                className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center"
                style={{ top: 0, bottom: 0 }}
            >
                <h1><b>About Us</b></h1>
                <h5 className="C-text">
                    <b>CoolRite Engineers</b>
                </h5>
            </div>

            {/* Info Section */}
            <MepInfo />
        </>
    );
};

export default AboutUs;

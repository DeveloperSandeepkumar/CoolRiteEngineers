import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Cipla from "../Assets/Cipla.png";
import Panacea from "../Assets/Panacea.jpg";
import IndSwift from "../Assets/IndSwift.png";
import LifeCare from "../Assets/LifeCare.png";
import Hella from "../Assets/Hella.jpg";
import FPCL from "../Assets/FPCL.png";
import Growel from "../Assets/Growel.png";
import Nector from "../Assets/Nector.png";
import Allenger from "../Assets/allenger.jpg";

import "./Customers.css";

const CustomerSlider = () => {

    const data = [
        { image: Cipla },
        { image: Panacea },
        { image: IndSwift },
        { image: LifeCare },
        { image: Hella },
        { image: FPCL },
        { image: Growel },
        { image: Nector },
        { image: Allenger }
    ];

    const settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "0px"
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <div className="container-fluid">
                <h2 className="Headings">Our Customers</h2>

                <Slider {...settings}>
                    {data.map((d, index) => (
                        <div key={index} className="slide-item">
                            <div className="card Customers">
                                <img
                                    src={d.image}
                                    className="rd-img-top"
                                    alt="customer"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CustomerSlider;

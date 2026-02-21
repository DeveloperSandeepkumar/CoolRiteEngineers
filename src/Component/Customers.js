import { React, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Cipla from '../Assets/Cipla.png';
import Panacea from '../Assets/Panacea.jpg';
import IndSwift from '../Assets/IndSwift.png';
import LifeCare from '../Assets/LifeCare.png';
import Hella from '../Assets/Hella.jpg';
import FPCL from '../Assets/FPCL.png';
import Growel from '../Assets/Growel.png';
import Nector from '../Assets/Nector.png';
import Allenger from '../Assets/allenger.jpg';
import '../Component/Customers.css';
import { Alert } from "bootstrap";

const CustomerSlider = () => {
    const data = [

        {
            image: Cipla
        },
        {
            image: Panacea
        },
        {
            image: IndSwift
        },
        {
            image: LifeCare
        },
        {
            image: Hella
        },
        {
            image: FPCL
        },
        {
            image: Growel
        },
        {
            image: Nector
        },
        {
            image: Allenger
        }

    ]
    var settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (<>
   
        <div className="slider-container">
            <div className="CardFlDiv container-fluid">
            <h2 className="Headings">Our Customers</h2>
                <Slider {...settings}>
                    {data.map((d) => (
                        <div className="carousel-item active">
                            <div className="card-wrapper ">
                                <div className="card Customers">
                                    <img src={d.image} class="card-img-top" alt="..." />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        </>
    );
}

export default CustomerSlider;










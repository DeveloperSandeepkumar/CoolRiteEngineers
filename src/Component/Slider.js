import { React, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import RectangularDuct from '../Assets/Rectangular G.I Duct.png';
import Circular from '../Assets/Circular G.I Duct.png';
import SteamPipe from '../Assets/Steam Pipe Insulation.png';
import ColdPipe from '../Assets/Cold Pipe Insulation.png';
import ReactorTank from '../Assets/Reactor & Tank Insulation.png';
import SteamBoiler from '../Assets/Steam Boiler Insulation Work.png';
import HotColdInsulation from '../Assets/Hot & Cold Insulation Work.jpg';
import ArmaflexInsu from '../Assets/Armaflex Cold Insulation Work.jpg';
import SoundProof from '../Assets/Sound Proof Insulation.jpg';
import ThermocouplePipe from '../Assets/Thermocouple Pipe Section Insulation Work.jpg';

import '../Component/Slider.css';

const SimpleSlider = () => {
    const data = [
        {
            name: 'Rectangular G.I Duct Work',
            image: RectangularDuct,
            review: 'The offered ducts are made from top notch GI materials. These ducts have very strong body. Our'
        },
        {
            name: 'Circular G.I Duct Work',
            image: Circular,
            review: 'The offered ducts are made from top notch GI materials. These ducts have very strong body. Our '
        },
        {
            name: 'Steam Pipe Insulation',
            image: SteamPipe,
            review: 'Steam pipe may refer to:A pipe designed to carry pressurized steam from a boiler to the working'
        },
        {
            name: 'Cold Pipe Insulation',
            image: ColdPipe,
            review: 'Just like hot insulation materials, some of the materials used to produce cold insulation vary '
        },
        {
            name: 'Reactor & Tank Insulation',
            image: ReactorTank,
            review: 'Owing to our rich experience of this domain, we have been able to render the best quality of  '
        },
        {
            name: 'Steam Boiler Insulation Work',
            image: SteamBoiler,
            review: 'This insulation work is best to have proper insulation in quick timing. We work as per the needs of the'
        },
        {
            name: 'Hot & Cold insulation Work',
            image: HotColdInsulation,
            review: 'We offer our service for Hot and Cold Insulation in various industries such as power plants, Sugar, ,'
        },
        {
            name: 'Armaflex Cold insulation Work',
            image: ArmaflexInsu,
            review: 'Armaflex® pipe insulation is a closed cell elastomeric nitrile rubber foam designed to provide'
        },
        {
            name: 'Sound Proof insulation Work',
            image: SoundProof,
            review: 'During building or remodeling, an effective and affordable way to improve the soundproofing '
        },
        {
            name: 'Thermocouple Pipe Insulation',
            image: ThermocouplePipe,
            review: 'The Thermocol Slab and Pipe section find wide use in efficiently controlling heat transfer in low '
        },

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
    return (
        <>        
            <div className="MainDiv slider-container">
            <p className="ProductHeading">The Best Industry And Company Services</p>
                <h3 className="ProductHeading">Our Products</h3>
                {/* <hr className="ProductHeading" ></hr> */}
                <div className="CardFlDiv container-fluid">
                    <Slider {...settings}>
                        {data.map((d) => (
                            <div className="carousel-item active">
                                <div className="card-wrapper ">
                                    <div className="card">
                                        <img src={d.image} class="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h4 className="text-left">{d.name}</h4>
                                            <hr></hr>
                                            <p className="card-title text-left CardReviw">{d.review}</p>

                                        </div>
                                        <button className="ReadButton">Read More</button>

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

export default SimpleSlider;

// const SimpleSlider = () => {
//     const data = [
//         {
//             name: 'Rectangular G.I Duct',
//             image: RectangularDuct,
//             review: 'The offered ducts are made from top notch GI materials. These ducts have very strong body. Our ducts have very simpl'
//         },
//         {
//             name: 'Circular G.I Duct',
//             image: Circular,
//             review: 'The offered ducts are made from top notch GI materials. These ducts have very strong body. Our ducts have very simpl'
//         },
//         {
//             name: 'Steam Pipe Insulation',
//             image: SteamPipe,
//             review: 'Steam pipe may refer to:A pipe designed to carry pressurized steam from a boiler to the working components, i.e. the'
//         },
//         {
//             name: 'Cold Pipe Insulation',
//             image: ColdPipe,
//             review: 'Just like hot insulation materials, some of the materials used to produce cold insulation vary dependent upon the'
//         },
//         {
//             name: 'Reactor & Tank Insulation',
//             image: ReactorTank,
//             review: 'Owing to our rich experience of this domain, we have been able to render the best quality of Tank Insulation '
//         },
//         {
//             name: 'Steam Boiler Insulation Work',
//             image: SteamBoiler,
//             review: 'This insulation work is best to have proper insulation in quick timing. We work as per the needs of the patrons and o'
//         },
//         {
//             name: 'Hot & Cold insulation Work',
//             image: HotColdInsulation,
//             review: 'We offer our service for Hot and Cold Insulation in various industries such as power plants, Sugar, Paper and pulp, Ce'
//         },
//         {
//             name: 'Armaflex Cold insulation Work',
//             image: ArmaflexInsu,
//             review: 'Armaflex® pipe insulation is a closed cell elastomeric nitrile rubber foam designed to provide a highly efficient metho'
//         },
//         {
//             name: 'Sound Proof insulation Work',
//             image: SoundProof,
//             review: 'During building or remodeling, an effective and affordable way to improve the soundproofing performance of walls '
//         },
//         {
//             name: 'Thermocouple Pipe Section Insulation',
//             image: ThermocouplePipe,
//             review: 'The Thermocol Slab and Pipe section find wide use in efficiently controlling heat transfer in low temperature appliance'
//         },

//     ]
//     var settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         initialSlide: 0,
//         responsive: [
//           {
//             breakpoint: 1024,
//             settings: {
//               slidesToShow: 3,
//               slidesToScroll: 1,
//               infinite: true,
//               dots: true
//             }
//           },
//           {
//             breakpoint: 600,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 1,
//               initialSlide: 1
//             }
//           },
//           {
//             breakpoint: 480,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//             }
//           }
//         ]
//       };

//     return (
//         <div className="MainDiv slider-container">
//             <div className="CardFlDiv container-fluid">
//                 <Slider {...settings}>
//                     {data.map((d) => (
//                         <div className="carousel-item active">
//                             <div className="card-wrapper ">
//                                 <div className="card">
//                                     <img src={d.image} class="card-img-top" alt="..." />
//                                     <div className="card-body">
//                                         <h5 className="card-title text-left CardReviw">{d.review}</h5>

//                                     </div>
//                                     <button>Read More</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// }


// export default SimpleSlider;









import React from "react";
import Slider from '../Assets/Slider.jpg';
import Slider1 from '../Assets/Slider1.jpg';
import director from '../Assets/director.jpeg';
import director1 from '../Assets/manager.jpeg';
import AboutUsPic from '../Assets/AboutUs.jpg'
import MepInfo from '../Component/Mep'
const AboutUs = () => {

    return (
        <>
            <div class="dark-img">
                <img src={AboutUsPic}  style={{height:'400px'}}/>
            </div>
            {/* <div className="carousel-caption d-none d-md-block">
                <b><h1>About Us</h1></b>
                <b><h5 className="C-text color:green;">CoolRite Engineers</h5></b>
            </div> */}
          <div
  className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center"
  style={{ top: 0, bottom: 0 }}
>
  <h1><b>About Us</b></h1>
  <h5 className="C-text" style={{ color: "" }}>
    <b>CoolRite Engineers</b>
  </h5>
</div>
             <MepInfo></MepInfo>
            {/* <div className="container text-center text-md-start mt-5 textdiv">
                <div className="row mt-3">
                    <div className="col-md-6 col-sm-12">
                        <div>
                            <h2 className="text-left">About Us</h2>
                            <p className="text-left">We are pleased to introduce ourselves as one of the prominent HVAC ducting & insulation ,Manpower Supply services contractors. We are well established in our field for the last sixteen years and are equipped with proper Technical Staff.
                            </p><p className="text-left"> As a result of more than 14 years experience and confidence that our customers have shown in our</p>
                            <h4>TECHNICAL CAPABILITIES:-</h4>
                            <p>We are professionally managed company with excellent team of experienced Technical staff Senior and skilled Duct fabricator , Academically well qualified & experienced in contract, Coupled with a large No. of skilled manpower.</p>
                            <p>Our unwavering commitment to excellence in term of quality & satisfaction. We shall be bound to follow all rules and regulations led by the company. We are sure yours satisfaction & timely Completion of works.</p>
                            <p>Thank you,</p>
                            <p>For M/s MK INSULATION & FABRICATION</p>
                        </div>
                    </div>
                    
                    <div className="col-md-3 col-sm-12">
                        <div className="card" style={{width:'16rem'}}>
                            <img className="card-img-top Img" src={director} alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-text">MANOJ KUMAR GUPTA<br />+91-9888409391</p>
                            </div>
                        </div>
                    </div>

                    <div className="col  col-md-3 col-sm-12">
                        <div className="card" style={{width:'16rem'}}>
                            <img className="card-img-top Img" src={director1} alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-text">HEMANT KUMAR GUPTA<br />+91-7009467480</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
        </>
    )

}

export default AboutUs;
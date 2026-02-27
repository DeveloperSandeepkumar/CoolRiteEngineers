import React,{ useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import Slider from '../Assets/Slider.jpg';
import Slider1 from '../Assets/Slider1.jpg';
import director from '../Assets/director.jpeg';
import director1 from '../Assets/manager.jpeg';
import director2 from '../Assets/sandeep (1).jpeg';
import ClientImg from '../Assets/Client.jpg';
import insulationwork from '../Assets/insulationwork.jpg';
import Insulation5 from '../Assets/Insulation5.jpg';
import CoolriteSlider from '../Assets/CoolriteSlider.jpeg';
import CoolriteSlider1 from '../Assets/CoolRiteSlider1.jpg';
import CoolriteSlider2 from '../Assets/CoolRiteSlider2.jpg';
import CoolriteSlider3 from '../Assets/CoolRiteSlider3.jpg';
import CardList from '../Component/OurServiceDetails.js';
import CallAdviserSection from '../Component/contactDetails.js'
import GetToucgImg from '../Assets/Getintouch_Image.jpg';
import AboutUs from "./AboutUs.js";
import '../Component/Home.css'
import SimpleSlider from "./Slider.js";
import CustomerSlider from "./Customers.js";
import MepInfo from '../Component/Mep.js';
import GetInTouch from '../Assets/GetInTouch.jpg';
 import { useNavigate } from "react-router-dom";


const Home = () => {
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setShowAbout(true);
     
  };
    return (
        <>
<div id="carouselExampleControls" className="carousel slide overlay" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <div className="dark-img">
                <img src={CoolriteSlider} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-caption custom-caption">
                <h1 className="carousel-heading">CoolRite Engineers</h1>
                <h5 className="carousel-subheading">High Performance Service For Industries</h5>
             <div className="button-group">
  <button
    className="button-modern"
    role="button"
   onClick={() => navigate("/about")}
  >
    About Us
  </button>

  {showAbout && <AboutUs />}

  <button
    className="button-modern"
    role="button"
  >
    Contact Us
  </button>
</div>
            </div>
        </div>

        <div className="carousel-item">
            <div className="dark-img">
                <img src={CoolriteSlider2} className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-caption custom-caption">
                <h1 className="carousel-heading">CoolRite Engineers</h1>
                <h5 className="carousel-subheading">High Performance Service For Industries</h5>
                <div className="button-group">
                    <button className="button-modern" role="button"  onClick={handleClick}>About Us</button>
                    <button className="button-modern" role="button">Contact Us</button>
                </div>
            </div>
        </div>

        <div className="carousel-item">
            <div className="dark-img">
                <img src={CoolriteSlider3} className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-caption custom-caption">
                <h1 className="carousel-heading">CoolRite Engineers</h1>
                <h5 className="carousel-subheading">High Performance Service For Industries</h5>
                <div className="button-group">
                    <button className="button-modern" role="button">About Us</button>
                    <button className="button-modern" role="button">Contact Us</button>
                </div>
            </div>
        </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>



          <div>{<MepInfo></MepInfo>}</div>
          
          <div>
          {<CardList></CardList>}
          </div>
         
            <div>      
                <div className="Get_touch">
                    <div className="container-fluid px-4 my-4">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className=" border-0 rounded-3 shadow-lg overflow-hidden">
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-sm-6 d-none d-sm-block bg-image">
                                            <img src={GetInTouch} style={{width:'600px',height:'500px', padding:'3%'}}/>
                                            </div>
                                            <div className="col-sm-6 p-4">
                                                <div className="text-center">
                                                    <div className="h3 fw-light"><h4 style={{color: 'brown'}}>Quick Enquiry</h4></div>
                                                    <hr></hr>
                                                    <p className="mb-4 " style={{fontSize:'14px'}}>Complete control over products allows us to ensure our customers receive the best quality prices and service.</p>
                                                </div>
                                                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="name" type="text" placeholder="Name" data-sb-validations="required" />
                                                        <label for="name">Name</label>
                                                        <div className="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                                        <label for="emailAddress">Email Address</label>
                                                        <div className="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                                        <div className="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <textarea className="form-control" id="Phone" type="text" placeholder="Phone" data-sb-validations="required"></textarea>
                                                        <label for="message">Phone</label>
                                                        <div className="invalid-feedback" data-sb-feedback="message:required">Phone is Required.</div>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <textarea className="form-control" id="message" type="text" placeholder="Message" data-sb-validations="required"></textarea>
                                                        <label for="message">Message</label>
                                                        <div className="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
                                                    </div>
                                                    <div className="d-none" id="submitSuccessMessage">
                                                        <div className="text-center mb-3">
                                                            <div className="fw-bolder">Form submission successful!</div>
                                                            <p>To activate this form, sign up at</p>
                                                            <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                                        </div>
                                                    </div>
                                                    <div className="d-none" id="submitErrorMessage">
                                                        <div className="text-center text-danger mb-3">Error sending message!</div>
                                                    </div>
                                                    <div className="d-grid">
                                                        <button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {<CustomerSlider></CustomerSlider>}
                <div className="ClientReviw"> 
                    <img src={ClientImg} className="ClientReviwImg" alt="" />
                </div>
            </div>
        </>
    );
}
export default Home;

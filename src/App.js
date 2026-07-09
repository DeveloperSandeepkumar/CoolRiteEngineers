import './App.css';

import Footer from './Component/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Header';
import Home from './Component/Home';
import MainHeader from './Component/MainHeader';
import AboutUs from './Component/AboutUs';
import ScrollToTop from "./Component/ScrollToTop";
import ContactButtons from "./Component/ContactButtons";
import ScrollTOP from "./Component/ScrollTOP";
import ServicePage from "./Component/ServicePage";
import { services } from "./Component/servicesData";
import ProposalFormWithMap from "./Component/ProposalFormWithMap";
import VendorRegistrationForm from "./Component/VendorRegistrationForm";
import ContactUs from "./Component/ContactUs";
import OurProduct from "./Component/OurProduct";
import Project from "./Component/Project";
import Career from './Component/Career';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />

        <MainHeader />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/OurProduct" element={<OurProduct />} />
          <Route path="/ourproduct" element={<OurProduct />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/project" element={<Project />} />

          {/* Dynamic services routes */}
          {services.map((service, index) => (
            <Route
              key={index}
              path={service.path}
              element={
                <ServicePage
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  mainImage={service.mainImage}
                  bannerImage={service.bannerImage}
                />
              }
            />
          ))}

          <Route path="/ProposalFormWithMap" element={<ProposalFormWithMap />} />
          <Route path="/VendorRegistrationForm" element={<VendorRegistrationForm />} />
          <Route path="/Career" element={<Career />} />
          <Route path="/career" element={<Career />} />
        </Routes>

        <Footer />
        <ContactButtons />
        <ScrollTOP />
      </BrowserRouter>
    </div>
  );
};

export default App;

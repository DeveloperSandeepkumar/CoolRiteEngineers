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
// ✅ PascalCase fix
import CoolRiteEngineer3D from "./Component/CoolRiteEngineer_3D";
import CoolRiteEngineerV5 from "./Component/CoolRiteEngineer_v5";

import CoolriteMeasurement from "./Component/CoolriteMeasurement";
import CoolriteMeasurement from "./Component/DataVoult";
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
         <Route path="/contactUs" element={<ContactUs />} />
   <Route path="/OurProduct" element={<OurProduct />} />
          {/* ✅ Fixed component names */}
          <Route path="/CoolRiteEngineer_3D" element={<CoolRiteEngineer3D />} />
          <Route path="/CoolRiteEngineer_v5" element={<CoolRiteEngineerV5 />} />
   <Route path="/CoolriteMeasurement" element={<CoolriteMeasurement />} />
   <Route path="/CoolriteMeasurement" element={<DataVoult />} />

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
        </Routes>

        <Footer />
        <ContactButtons />
        <ScrollTOP />
      </BrowserRouter>
    </div>
  );
};

export default App;

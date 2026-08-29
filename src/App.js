import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Component/Footer';
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
import LocationPage from './Component/LocationPage';
import SEO from './Component/SEO';
import AppDownloadPopup from './Component/AppDownloadPopup';

const App = () => {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <SEO />
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
                  <>
                    <SEO 
                      title={`${service.title} | CoolRite Engineers Baddi & Punjab`}
                      description={service.description}
                      canonicalUrl={`https://www.coolriteengineers.com${service.path}`}
                    />
                    <ServicePage
                      title={service.title}
                      description={service.description}
                      features={service.features}
                      mainImage={service.mainImage}
                      bannerImage={service.bannerImage}
                    />
                  </>
                }
              />
            ))}

            {/* Dynamic & Specific Location SEO Routes */}
            <Route path="/locations/:locationId" element={<LocationPage />} />
            <Route path="/locations/hvac-contractors-baddi-himachal" element={<LocationPage locationId="hvac-contractors-baddi-himachal" />} />
            <Route path="/locations/industrial-ducting-baddi" element={<LocationPage locationId="industrial-ducting-baddi" />} />
            <Route path="/locations/ahu-ventilation-system-baddi" element={<LocationPage locationId="ahu-ventilation-system-baddi" />} />
            <Route path="/locations/hvac-contractors-chandigarh-mohali" element={<LocationPage locationId="hvac-contractors-chandigarh-mohali" />} />
            <Route path="/locations/industrial-hvac-mep-punjab" element={<LocationPage locationId="industrial-hvac-mep-punjab" />} />

            {/* NEW: Vendor / Supplier / Company keyword routes for Baddi searches */}
            <Route path="/locations/hvac-vendor-baddi-himachal" element={<LocationPage locationId="hvac-vendor-baddi-himachal" />} />
            <Route path="/locations/hvac-supplier-baddi-himachal" element={<LocationPage locationId="hvac-supplier-baddi-himachal" />} />
            <Route path="/locations/hvac-company-baddi-himachal" element={<LocationPage locationId="hvac-company-baddi-himachal" />} />

            {/* Direct URL Aliases for top Google ranking */}
            <Route path="/hvac-contractors-baddi-himachal" element={<LocationPage locationId="hvac-contractors-baddi-himachal" />} />
            <Route path="/hvac-vendor-baddi" element={<LocationPage locationId="hvac-vendor-baddi-himachal" />} />
            <Route path="/hvac-supplier-baddi" element={<LocationPage locationId="hvac-supplier-baddi-himachal" />} />
            <Route path="/hvac-company-baddi" element={<LocationPage locationId="hvac-company-baddi-himachal" />} />

            {/* NEW: Chandigarh / Mohali / Panchkula Tricity Routes */}
            <Route path="/locations/hvac-contractor-chandigarh" element={<LocationPage locationId="hvac-contractor-chandigarh" />} />
            <Route path="/locations/hvac-vendor-chandigarh" element={<LocationPage locationId="hvac-vendor-chandigarh" />} />
            <Route path="/locations/ac-ducting-services-mohali" element={<LocationPage locationId="ac-ducting-services-mohali" />} />
            <Route path="/locations/mep-contractor-chandigarh-mohali" element={<LocationPage locationId="mep-contractor-chandigarh-mohali" />} />
            {/* Tricity short aliases */}
            <Route path="/hvac-chandigarh" element={<LocationPage locationId="hvac-contractor-chandigarh" />} />
            <Route path="/hvac-mohali" element={<LocationPage locationId="hvac-vendor-chandigarh" />} />
            <Route path="/ac-ducting-mohali" element={<LocationPage locationId="ac-ducting-services-mohali" />} />
            <Route path="/mep-chandigarh" element={<LocationPage locationId="mep-contractor-chandigarh-mohali" />} />

            {/* NEW: Punjab Statewide Routes */}
            <Route path="/locations/hvac-contractor-punjab" element={<LocationPage locationId="hvac-contractor-punjab" />} />
            <Route path="/locations/hvac-vendor-punjab" element={<LocationPage locationId="hvac-vendor-punjab" />} />
            {/* Punjab short aliases */}
            <Route path="/hvac-contractor-punjab" element={<LocationPage locationId="hvac-contractor-punjab" />} />
            <Route path="/hvac-vendor-punjab" element={<LocationPage locationId="hvac-vendor-punjab" />} />

            <Route path="/ProposalFormWithMap" element={<ProposalFormWithMap />} />
            <Route path="/VendorRegistrationForm" element={<VendorRegistrationForm />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/career" element={<Career />} />
          </Routes>

          <Footer />
          <ContactButtons />
          <ScrollTOP />
          <AppDownloadPopup />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
};

export default App;

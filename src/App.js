import './App.css';
// import Route from './Routes';
import Footer from './Component/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Component/Header';
import Home from './Component/Home';
import MainHeader from './Component/MainHeader';
import AboutUs from './Component/AboutUs';
import MyNavbar from './Component/MyNavbar';
import ScrollToTop from "./Component/ScrollToTop";
// import AcInstallation from "./Component/AcInstallation";
import ContactButtons from "./Component/ContactButtons";
import ScrollTOP from "./Component/ScrollTOP";
// import DuctableAC from "./Component/DuctableAc";
// import VRVServices from "./Component/VRV "
import ServicePage from "./Component/ServicePage";
import { services } from "./Component/servicesData";
import ProposalFormWithMap from "./Component/ProposalFormWithMap";
import VendorRegistrationForm from "./Component/VendorRegistrationForm";
const App = () => {
  const UserType = localStorage.getItem('User_Type');
  return (
    <div className="App">
      <BrowserRouter>
         <ScrollToTop />
      <MainHeader></MainHeader>
       <Navbar></Navbar>


        {/* <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<AboutUs />} />
               <Route path="/AcInstallation" element={<AcInstallation />} />
                      <Route path="/DuctableAC" element={<DuctableAC />} />
                       <Route path="/VRVServices" element={<VRVServices />} />
               
        </Routes> */}
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/About" element={<AboutUs />} />

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
        <Footer></Footer>
              <ContactButtons />
                 <ScrollTOP />
      </BrowserRouter>
    </div>
  );
}

export default App;

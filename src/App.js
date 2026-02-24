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
import AcInstallation from "./Component/AcInstallation";

const App = () => {
  const UserType = localStorage.getItem('User_Type');
  return (
    <div className="App">
      <BrowserRouter>
         <ScrollToTop />
      <MainHeader></MainHeader>
       <Navbar></Navbar>


        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<AboutUs />} />
               <Route path="/AcInstallation" element={<AcInstallation />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

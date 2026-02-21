import './App.css';
// import Route from './Routes';
import Footer from './Component/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Component/Header';
import Home from './Component/Home';
import MainHeader from './Component/MainHeader';
import AboutUs from './Component/AboutUs';
import MyNavbar from './Component/MyNavbar';

const App = () => {
  const UserType = localStorage.getItem('User_Type');
  return (
    <div className="App">
      <BrowserRouter>
      <MainHeader></MainHeader>
       <Navbar></Navbar>


        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<AboutUs />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

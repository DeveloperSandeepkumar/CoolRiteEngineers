import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Hamburger from '../Assets/menu.png'

import CoolRiteLogo1 from '../Assets/MainLogo.png'
import { FaTimes } from "react-icons/fa";

import { services } from "../Component/servicesData";
import './Header.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpenOther, setDropdownOpenOther] = useState(false)
  const location = useLocation()

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    setDropdownOpen(!dropdownOpen)
  }

  const handleDropdownToggleOther = (e) => {
    e.preventDefault()
    setDropdownOpenOther(!dropdownOpenOther)
  }

  const closeNavbar = () => {
    setShowNavbar(false)
    setDropdownOpen(false) 
    setDropdownOpenOther(false)
  }

  // Close navbar when route changes
  useEffect(() => {
    setShowNavbar(false)
    setDropdownOpen(false)
    setDropdownOpenOther(false)
  }, [location])

  return (
    <nav className="navbar">
      <div className="container">
        
        {/* Mobile Header Bar */}
        <div className="menu-icon" onClick={handleShowNavbar}>
          {showNavbar ? (
            <FaTimes style={{ fontSize: '30px', cursor: 'pointer' }} />
          ) : (
            <img
              src={Hamburger}
              alt="Menu"
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
            />
          )}

          <img
            src={CoolRiteLogo1}
            alt="CoolRite Logo"
            style={{
              width: '50px',
              height: '40px',
              borderRadius: '15px',
              objectFit: 'cover',
            }}
          />
        </div>

        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
          <img
            src={CoolRiteLogo1}
            alt="CoolRite Logo"
            className="desktop-logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '9px',
            }}
          />
          <ul>
            <li><NavLink to="/" onClick={closeNavbar}>HOME</NavLink></li>
            <li><NavLink to="/About" onClick={closeNavbar}>ABOUT US</NavLink></li>
            
            {/* MEP Services Dropdown */}
            <li>
              <div className="dropdown">
                <NavLink to="#" onClick={handleDropdownToggle}>MEP SERVICES</NavLink>
                <ul className={`dropdown-content ${dropdownOpen ? 'show-mobile' : ''}`}>
                  {services.map((service, index) => (
                    <li key={index}>
                      <NavLink to={service.path} onClick={closeNavbar}>
                        {service.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Other Dropdown */}
            <li>
              <div className="dropdown">
                <NavLink to="#" onClick={handleDropdownToggleOther}>OTHER</NavLink>
                <ul className={`dropdown-content Other ${dropdownOpenOther ? 'show-mobile' : ''}`}>
                  <li>
                    <NavLink to="/ProposalFormWithMap" onClick={closeNavbar}>Request Proposal For New Project</NavLink>
                  </li>
                  <li>
                    <NavLink to="/VendorRegistrationForm" onClick={closeNavbar}>Vendor Registration Form</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contactUs" onClick={closeNavbar}>Pay Now</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={closeNavbar}>Our Clients</NavLink>
                  </li>
                  <li>
                    <NavLink to="/CoolRiteEngineer_3D" onClick={closeNavbar}>Design V1</NavLink>
                  </li>
                  <li>
                    <NavLink to="/CoolRiteEngineer_v5" onClick={closeNavbar}>Design V2</NavLink>
                  </li>
                  <li>
                    <NavLink to="/CoolriteMeasurement" onClick={closeNavbar}>Design V3</NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li><NavLink to="/OurProduct" onClick={closeNavbar}>PRODUCT</NavLink></li>
            <li><NavLink to="/Project" onClick={closeNavbar}>PROJECT</NavLink></li>
            <li><NavLink to="/Career" onClick={closeNavbar}>CAREER</NavLink></li>
            <li><NavLink to="/ContactUs" onClick={closeNavbar}>CONTACT US</NavLink></li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar;

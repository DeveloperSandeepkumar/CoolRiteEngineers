import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Hamburger from '../Assets/menu.png'

import CoolRiteLogo from '../Assets/CoolRiteLogo.jpeg'
import CoolRiteLogo1 from '../Assets/MainLogo.png'
import { FaLongArrowAltRight, FaTimes } from "react-icons/fa"
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
    e.preventDefault()  // Prevent closing the navbar when clicking the dropdown toggle
    setDropdownOpen(!dropdownOpen)
  }


  const handleDropdownToggleOther = (e) => {
    e.preventDefault()  // Prevent closing the navbar when clicking the dropdown toggle
    setDropdownOpenOther(!dropdownOpenOther)
  }
  const closeNavbar = () => {
    setShowNavbar(false)
    setDropdownOpen(false) 
    setDropdownOpenOther(false)
     // Optionally, close the dropdown when navbar closes
  }


  // Close navbar when route changes (excluding the dropdown)
  useEffect(() => {
    if (!dropdownOpen) {
      setShowNavbar(false) // Close navbar if route changes
    }
  }, [location, dropdownOpen])

  useEffect(() => {
    if (!dropdownOpenOther) {
      setShowNavbar(false) // Close navbar if route changes
    }
  }, [location, dropdownOpenOther])

  return (
    <nav className="navbar">
      <div className="container">
        {/* <div className="menu-icon" onClick={handleShowNavbar}>
          {showNavbar ? (
            <FaTimes className="close-icon" style={{ fontSize: '30px' }} />
          ) : (
            <img className='MenuBar' src={Hamburger} alt='Menu' />
          )
          
          
          }
          <img src={ CoolRiteLogo1} style={{width:'50px',height:'40px',borderRadius:'20px', justifyContent: 'right'}} />
        </div> */}
        <div
  className="menu-icon"
  onClick={handleShowNavbar}
  style={{
    display: window.innerWidth <= 768 ? 'flex' : 'none', // show only on mobile
    justifyContent: 'space-between', // hamburger left, logo right
    alignItems: 'center',
    width: '100%',
    padding: '10px 15px',
  }}
>
  {/* Hamburger */}
  {showNavbar ? (
    <FaTimes style={{ fontSize: '30px', cursor: 'pointer' }} />
  ) : (
    <img
      src={Hamburger}
      alt="Menu"
      style={{ width: '25px', height: '25px', cursor: 'pointer' }}
    />
  )}

  {/* Logo on the right */}
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
  src={CoolRiteLogo}
  alt="CoolRite Logo"
  style={{
    width: '100px',
    height: '40px',
    display: window.innerWidth > 768 ? 'block' : 'none', // only show on desktop
  }}
/>
          <ul>
         
            <li><NavLink to="/" onClick={closeNavbar}>HOME</NavLink></li>
            <li><NavLink to="/About" onClick={closeNavbar}>ABOUT</NavLink></li>
            <li>
              <div style={{    width:'100%'}} className="dropdown">
                <NavLink to="#" onClick={handleDropdownToggle}>MEP SERVICES</NavLink>
                {dropdownOpen && (            
                  <ul className="dropdown-content" style={{ width:'200px' }}>
                    <li style={{   width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="/AcInstallation" onClick={closeNavbar}> Ac Installation</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Ductable Ac</NavLink></li>
                    <li style={{    width:'100%' ,padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> VRV / VRF</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Cassette Ac</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Chiller Ac</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> AHU</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> FCU</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Package AC</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Plumbing</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Fire Fighting</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Drainage System</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Electricals</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Welding</NavLink></li>
                    <li style={{    width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}> Bill of Quantities</NavLink></li>
                  </ul>
                )}
              </div>
            </li>
            <li>
            <div className="dropdown">
                <NavLink to="#" onClick={handleDropdownToggleOther}>OTHER</NavLink>
                {dropdownOpenOther && (
                  <ul className="dropdown-content Other"  style={{ width:'300px' }}>
                    <li style={{ width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}>Request Proposal For New Project</NavLink></li>
                    <li style={{ width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}>Vendor Registration from</NavLink></li>
                    <li style={{ width:'100%' ,padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}>Pay Now</NavLink></li>
                    <li style={{ width:'100%',padding: '1px', textAlign:'left'}}><NavLink to="" onClick={closeNavbar}>Our Clients</NavLink></li>
                    
                  </ul>
                )}
              </div>
            </li>
            <li><NavLink to="/Product" onClick={closeNavbar}>PRODUCT</NavLink></li>
            <li><NavLink to="/Project" onClick={closeNavbar}>PROJECT</NavLink></li>
            <li><NavLink to="/Career" onClick={closeNavbar}>CAREER</NavLink></li>
            <li><NavLink to="/Contact" onClick={closeNavbar}>CONTACT</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

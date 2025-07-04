import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'; // 👈 added FaUser
import logo from '../../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleBookNow = () => {
    navigate('/appointment');
    setIsOpen(false);
  };

  const handleNavigate = (path, hash = '') => {
    navigate(`${path}${hash}`);
    setIsOpen(false);
  };

  const handleUserIconClick = () => {
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}>
          <img src={logo} alt="SpaSalon Logo" className="logo-img" />
        </a>
      </div>

      <ul className={isOpen ? 'navbar-menu active' : 'navbar-menu'}>
        <li>
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}>
            Home
          </a>
        </li>
        <li>
          <a href="/services" onClick={(e) => { e.preventDefault(); handleNavigate('/services'); }}>
            Services
          </a>
        </li>
        <li>
          <a href="/#reviews" onClick={(e) => { e.preventDefault(); handleNavigate('/', '#reviews'); }}>
            Reviews
          </a>
        </li>
        <li>
          <a href="/#contact" onClick={(e) => { e.preventDefault(); handleNavigate('/', '#contact'); }}>
            Contact
          </a>
        </li>
        <li className="navbar-book-mobile">
          <button onClick={handleBookNow}>Book Now</button>
        </li>
      </ul>

      <div className="navbar-actions">
        <div className="navbar-book-desktop">
          <button onClick={handleBookNow}>Book Now</button>
        </div>
        <div className="navbar-user-icon" onClick={handleUserIconClick}>
          <FaUser size={22} />
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

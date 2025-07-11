import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Sunday Luxury" className="footer-logo" />
          <p>Experience luxury and relaxation at Sunday Luxury Spa & Salon</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-item">
            <FaPhone /> <span>+254725288288</span>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt /> <span>@The Mugumo, Mwingi Road,<br></br> kileleshwa, Nairobi</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Sunday Luxury. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
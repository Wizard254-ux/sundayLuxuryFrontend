import React from 'react';
import './Footer.css';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Sunday Luxury" className="footer-logo" />
          <p>Experience luxury and relaxation at Sunday Luxury Spa</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-item">
            <FaPhone /> <span>+254707697930</span>
          </div>
          <div className="contact-item">
            <FaPhone /> <span>+254721494070</span>
          </div>
          <div className="contact-item">
            <FaPhone /> <span>+254725288288</span>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt />{" "}
            <span>
              @The Mugumo, Mwingi Road,<br></br> Kileleshwa, Nairobi
            </span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/sundays_luxury_spa">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@sundayspa2025?_t=ZM-8xySl6zYGGc&_r=1">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Sunday Luxury Spa. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import './ContactSection.css';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

const ContactSection = () => {
  const navigate = useNavigate(); // 👈 Initialize the navigator

  const handleBookClick = () => {
    navigate('/appointment'); // 👈 Navigate to Appointment page
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <h1>Visit Our Sanctuary</h1>
        <p>Ready to begin your journey to wellness? Book your appointment today</p>
      </div>

      <div className="contact-content">
        <div className="contact-information-card">
          <h2>Contact Information</h2>
          <div className="contact-detail">
            <h3>Address</h3>
            <p>James Gishuru Road near Laviton Mall</p>
            <p>Lavington district</p>
          </div>
          <div className="contact-detail">
            <h3>Phone</h3>
            <p>+254711692522</p>
          </div>
          <div className="contact-detail">
            <h3>Hours</h3>
            <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p>Saturday - Sunday: 9:00 AM - 6:00 PM</p>
          </div>
          <div className="contact-detail">
            <h3>Email</h3>
            <p>sundaywellness@gmail.com</p>
          </div>
        </div>

        <div className="book-appointment-card">
          <h2>Ready to Experience Serenity?</h2>
          <p>Book your personalized spa experience today and discover the perfect balance of luxury and wellness.</p>
          <button className="book-appointment-button" onClick={handleBookClick}>
            Book Your Appointment
          </button>

          <div className="stats-container">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3>5 Years</h3>
              <p>Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

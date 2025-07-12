import React from 'react';
import './ContactSection.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactSection = () => {
  const navigate = useNavigate(); // 👈 Initialize the navigator

  const handleBookClick = () => {
    navigate('/appointment'); // 👈 Navigate to Appointment page
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-header">
        <h1>Visit Our Sanctuary</h1>
        <p>
          Ready to begin your journey to wellness? Book your appointment today
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-information-card">
          <h2>Contact Information</h2>
          <div className="contact-detail">
            <h3>Address</h3>
            <p>@The Mugumo, Mwingi Road, kileleshwa, Nairobi</p>
          </div>
          <div className="contact-detail">
            <h3>Phone</h3>
            <p>+254725288288</p>
          </div>
          <div className="contact-detail">
            <h3>Opening Hours</h3>
            <p>Monday - Friday : 9:00 AM - 9:00 PM</p>
            <p>Saturday : 8:30 AM - 9:00 PM</p>
            <p>Sunday: 10:00 AM - 8:30 PM</p>
          </div>
        </div>

        <div className="book-appointment-card">
          <h2>Ready to Experience Serenity?</h2>
          <p>
            Book your personalized spa experience today and discover the perfect
            balance of luxury and wellness.
          </p>
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

      <div className="map-container">
        <h2>Find Us Here</h2>
        <MapContainer
          center={[-1.2823, 36.7821]}
          zoom={30}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[-1.2823, 36.7821]}>
            <Popup>
              Sunday Luxury Spa & Salon
              <br />
              @The Mugumo, Mwingi Road, Kileleshwa, Nairobi
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactSection;

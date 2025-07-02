import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointment.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Appointment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '+254',
    email: '',
    service: [],
    date: '',
    time: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book an appointment');
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'service') {
      setFormData((prev) => ({
        ...prev,
        service: checked
          ? [...prev.service, value]
          : prev.service.filter((s) => s !== value),
      }));
    } else if (name === 'phone') {
      let phone = value;
      if (!phone.startsWith('+254')) {
        phone = '+254' + phone.replace(/^\+?254|^0/, '');
      }
      setFormData((prev) => ({
        ...prev,
        phone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, service, date, time } = formData;

    if (!name || !phone || !email || !service.length || !date || !time) {
      alert('All fields are required.');
      return;
    }

    if (!/^\+2547\d{8}$/.test(phone)) {
      alert('Phone number must be in format +2547XXXXXXXX');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in.');
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:5000/appointments', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Appointment booked successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error booking appointment:', error.response?.data || error.message);
      alert('Something went wrong. Please try again.');
    }
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 6);

  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <>
      <Navbar />
      <section className="appointment-section">
        <div className="appointment-container">
          <h1>Book Your Appointment</h1>
          <form onSubmit={handleSubmit} className="appointment-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +254712345678"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="service-options">
              <label>
                <input type="checkbox" name="service" value="facial" onChange={handleChange} /> Facial
              </label>
              <label>
                <input type="checkbox" name="service" value="massage" onChange={handleChange} /> Massage
              </label>
              <label>
                <input type="checkbox" name="service" value="body" onChange={handleChange} /> Body Treatment
              </label>
            </div>

            <input
              type="date"
              name="date"
              required
              min={minDateStr}
              max={maxDateStr}
              value={formData.date}
              onChange={handleChange}
            />
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
            />
            <button type="submit">Confirm Appointment</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Appointment;

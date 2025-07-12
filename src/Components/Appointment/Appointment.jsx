import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "+254",
    email: "",
    service: [],
    date: "",
    time: "",
  });

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showWorkingHoursModal, setShowWorkingHoursModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Working hours definition
  const workingHours = {
    monday: { start: "09:00", end: "21:00" },
    tuesday: { start: "09:00", end: "21:00" },
    wednesday: { start: "09:00", end: "21:00" },
    thursday: { start: "09:00", end: "21:00" },
    friday: { start: "09:00", end: "21:00" },
    saturday: { start: "08:30", end: "21:00" },
    sunday: { start: "10:00", end: "20:30" },
  };

  // Service categories from the image
  const serviceCategories = {
    grooming: {
      title: "Grooming",
      services: [
        { name: "Kids", price: 500 },
        { name: "Beard", price: 500 },
        { name: "Adults", price: 1000 },
        { name: "Hair+Dye", price: 1500 },
        { name: "Texturizer", price: 1500 },
      ],
    },
    hairDyes: {
      title: "Hair Dyes",
      services: [
        { name: "Colored", price: 2500 },
        { name: "White", price: 3000 },
        { name: "Platinum", price: 3000 },
      ],
    },
    mensPedicure: {
      title: "Men's Pedicure",
      services: [
        { name: "Cut & File", price: 600 },
        { name: "Full Pedicure", price: 2000 },
      ],
    },
    womensPedicureNails: {
      title: "Women's Pedicure & Nails",
      services: [
        { name: "Half Pedicure & Gel", price: 2000 },
        { name: "Full Pedicure & Gel", price: 3000 },
        { name: "Gel Polish", price: 1000 },
        { name: "Builder Gel", price: 2500 },
        { name: "Acrylics", price: 4500 },
        { name: "Gum Gel", price: 4000 },
        { name: "Tips & Gel", price: 2000 },
        { name: "Stick'ons", price: 1500 },
        { name: "Art (per finger)", price: 100 },
      ],
    },
    massage: {
      title: "Massage (Men & Women)",
      services: [
        { name: "Aromatherapy - 60mins", price: 5000 },
        { name: "Swedish Massage - 45mins", price: 3500 },
        { name: "Swedish Massage - 60mins", price: 5500 },
        { name: "Swedish Massage - 75mins", price: 7000 },
        { name: "Swedish Massage - 90mins", price: 8500 },
        { name: "Deep Tissue - 60mins", price: 6500 },
        { name: "Reflexology (Foot Only) - 60mins", price: 4500 },
        { name: "Indian Head Massage - 60mins", price: 3500 },
        { name: "Relaxation Massage - 60mins", price: 3500 },
        { name: "Hotstone Massage - 20mins", price: 3500 },
        { name: "Hotstone Massage - 30mins", price: 4500 },
        { name: "Hotstone Massage - 40mins", price: 6500 },
      ],
    },
    facials: {
      title: "Facials",
      services: [
        { name: "Scrub", price: 1500 },
        { name: "Face Steaming", price: 2000 },
        { name: "Scrub & Face Mask", price: 2000 },
        { name: "Regular Facial", price: 3000 },
        { name: "Advanced Facial", price: 3500 },
      ],
    },
  };

  // Function to get day of week from date
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[date.getDay()];
  };

  // Function to validate time within working hours
  const isTimeWithinWorkingHours = (date, time) => {
    if (!date || !time) return true; // Don't validate if either is empty

    const dayOfWeek = getDayOfWeek(date);
    const hours = workingHours[dayOfWeek];

    if (!hours) return false;

    return time >= hours.start && time <= hours.end;
  };

  // Function to get working hours display text
  const getWorkingHoursText = (date) => {
    if (!date) return "";

    const dayOfWeek = getDayOfWeek(date);
    const hours = workingHours[dayOfWeek];

    if (!hours) return "";

    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const hourInt = parseInt(hour);
      const ampm = hourInt >= 12 ? "PM" : "AM";
      const displayHour =
        hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
      return `${displayHour}:${minute} ${ampm}`;
    };

    const dayName = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return `${dayName}: ${formatTime(hours.start)} - ${formatTime(hours.end)}`;
  };

  // Function to show working hours modal
  const showWorkingHoursError = (date) => {
    const hoursText = getWorkingHoursText(date);
    setModalMessage(hoursText);
    setShowWorkingHoursModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowWorkingHoursModal(false);
    setModalMessage("");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     alert('Please log in to book an appointment');
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "service") {
      setFormData((prev) => ({
        ...prev,
        service: checked
          ? [...prev.service, value]
          : prev.service.filter((s) => s !== value),
      }));
    } else if (name === "phone") {
      let phone = value;
      if (!phone.startsWith("+254")) {
        phone = "+254" + phone.replace(/^\+?254|^0/, "");
      }
      setFormData((prev) => ({
        ...prev,
        phone,
      }));
    } else if (name === "time") {
      // Validate time when it changes
      if (formData.date && !isTimeWithinWorkingHours(formData.date, value)) {
        showWorkingHoursError(formData.date);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "date") {
      // Clear time when date changes to avoid conflicts
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        time: "", // Clear time when date changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toggleDropdown = (category) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, service, date, time } = formData;

    if (!name || !phone || !email || !service.length || !date || !time) {
      alert("All fields are required.");
      return;
    }

    // Updated regex to allow both +2547 and +2541 prefixes
    if (!/^\+254[17]\d{8}$/.test(phone)) {
      alert("Phone number must be in format +2547XXXXXXXX or +2541XXXXXXXX");
      return;
    }

    // Final validation for working hours
    if (!isTimeWithinWorkingHours(date, time)) {
      showWorkingHoursError(date);
      return;
    }

    try {
      await axios.post(
        "https://sundayluxury.onrender.com/appointments",
        formData,
        {
          headers: {},
        }
      );

      alert("Appointment booked successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error booking appointment:",
        error.response?.data || error.message
      );
      alert("Something went wrong. Please try again.");
    }
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 6);

  const minDateStr = today.toISOString().split("T")[0];
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <section className="appointment-section">
        <div className="appointment-container">
          <h1>Book Your Appointment</h1>
          <form onSubmit={handleSubmit} className="appointment-form px-3">
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
              placeholder="e.g. +254712345678 or +254112345678"
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

            <div className="service-selection">
              <h3>Select Services</h3>
              <div className="selected-services">
                {formData.service.length > 0 && (
                  <div className="selected-count">
                    Selected: {formData.service.length} service(s)
                  </div>
                )}
              </div>

              {Object.entries(serviceCategories).map(
                ([categoryKey, category]) => (
                  <div key={categoryKey} className="service-category">
                    <div
                      className="category-header"
                      onClick={() => toggleDropdown(categoryKey)}
                    >
                      <h4>{category.title}</h4>
                      <span
                        className={`dropdown-arrow ${
                          openDropdowns[categoryKey] ? "open" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>

                    {openDropdowns[categoryKey] && (
                      <div className="service-options">
                        {category.services.map((service, index) => (
                          <label key={index} className="service-item">
                            <input
                              type="checkbox"
                              name="service"
                              value={`${service.name} - KSh ${service.price}`}
                              checked={formData.service.includes(
                                `${service.name} - KSh ${service.price}`
                              )}
                              onChange={handleChange}
                            />
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">
                              KSh {service.price}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <span className="ml-2">Date</span>
            <input
              type="date"
              name="date"
              required
              min={minDateStr}
              max={maxDateStr}
              value={formData.date}
              onChange={handleChange}
            />

            <span className="ml-2">Time</span>
            {formData.date && (
              <div className="working-hours-info">
                Working hours: {getWorkingHoursText(formData.date)}
              </div>
            )}
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

      {/* Working Hours Modal */}
      {showWorkingHoursModal && (
        <div className="working-hours-modal" onClick={closeModal}>
          <div
            className="working-hours-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="working-hours-modal-icon">🕐</div>
            <h3 className="working-hours-modal-title">
              Oops! Time Not Available
            </h3>
            <p className="working-hours-modal-message">
              Selected time is not within our working hours.
            </p>
            <div className="working-hours-modal-hours">{modalMessage}</div>
            <button className="working-hours-modal-button" onClick={closeModal}>
              Select New Time
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Appointment;

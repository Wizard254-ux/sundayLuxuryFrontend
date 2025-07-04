import React, { useEffect, useState } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Services = ({ showAll = true }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://www.sundayluxuryspa.com/services');
        console.log('fetche dsttervices ',res.data)
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]); // prevent crashing if fetch fails
      }
    };

    fetchServices();
  }, []);

  const visibleServices = showAll ? services : services.slice(0, 4);

  return (
    <>
      {showAll && <Navbar />}

      <section className="services-section" id="services">
        <h2>Our Signature Services</h2>
        <p className="services-intro">
          Discover our curated treatments to nurture your body, mind, and spirit.
        </p>

        <div className="services-grid">
          {visibleServices.map((service) => {
            const imagePath = service.images?.[0];
            const imageUrl = imagePath
              ? `${imagePath}`
              : ''; // fallback to local image

            return (
              <div className="service-card" key={service._id}>
                <Link to={`/description/${service._id}`}>
                  <img
                    src={imageUrl}
                    alt={service.title || 'Service'}
                    className="service-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/no-image.jpg'; // fallback if image URL fails
                    }}
                  />
                </Link>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-footer">
                    <span>{service.duration || 'N/A'}</span>
                    <span>{service.price ? `KES ${service.price}` : 'Price Unavailable'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && (
          <div className="view-more-btn">
            <Link to="/services">View All Services</Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Services;

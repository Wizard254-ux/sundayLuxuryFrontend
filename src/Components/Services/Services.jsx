import React, { useEffect, useState } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Services = ({ showAll = true }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://sundayluxury.onrender.com/services');
        console.log('hello',res)
        
        // Check if response data is an array
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          console.error('Expected array but got:', typeof res.data, res.data);
          setServices([]); // fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
        setServices([]); // prevent crashing if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Ensure services is always an array before slicing
  const visibleServices = showAll 
    ? (Array.isArray(services) ? services : []) 
    : (Array.isArray(services) ? services.slice(0, 4) : []);

  if (loading) {
    return (
      <>
        {showAll && <Navbar />}
        <section className="services-section">
          <div className="loading">Loading services...</div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        {showAll && <Navbar />}
        <section className="services-section">
          <div className="error">Error loading services: {error}</div>
        </section>
      </>
    );
  }

  return (
    <>
      {showAll && <Navbar />}

      <section className="services-section" id="services">
        <h2 className="font-serif">Our Signature Services</h2>
        <p className="services-intro">
          Discover our curated treatments to nurture your body, mind, and spirit.
        </p>

        <div className="services-grid">
          {visibleServices.length === 0 ? (
            <div className="no-services">No services available</div>
          ) : (
            visibleServices.map((service) => {
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
                    <h3 className='font-semibold text-2xl'>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-footer">
                      <span>{service.price ? `KES ${service.price}` : 'Price Unavailable'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!showAll && visibleServices.length > 0 && (
          <div className="view-more-btn">
            <Link to="/services">View All Services</Link>
          </div>
        )}
      </section>
      {showAll && <Footer />}
    </>
  );
};

export default Services;
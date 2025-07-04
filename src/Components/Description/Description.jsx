import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Description.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Description = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`https://sundayluxury.onrender.com/services/${id}`);
        console.log('description',res.data)
        setService(res.data);
      } catch (err) {
        console.error(err);
        setError('Service not found');
      }
    };
    fetchService();
  }, [id]);

  if (error) return <div className="description-error">{error}</div>;
  if (!service) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="description-container">
        <img
          src={service.images?.[0]}
          alt={service.title}
          className="main-image"
          onError={(e) => (e.target.src = '')}
        />

        {service.images.length > 1 && (
          <div className="image-slider">
            {service.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className="slider-img"
                onError={(e) => (e.target.src = '')}
              />
            ))}
          </div>
        )}

        <div className="description-content">
          <h1>{service.title}</h1>
          <p>{service.description}</p>

          {service.products?.length > 0 && (
            <div className="description-section">
              <h2>Products Used</h2>
              <ul>{service.products.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}

          {service.benefits?.length > 0 && (
            <div className="description-section">
              <h2>Benefits</h2>
              <ul>{service.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          )}

          <div className="service-footer">
            <span>Duration: {service.duration}</span>
            <span>Price: KES {service.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;

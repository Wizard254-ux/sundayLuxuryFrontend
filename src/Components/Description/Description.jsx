import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Description.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Description = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`https://sundayluxury.onrender.com/services/${id}`);
        console.log('description', res.data);
        setService(res.data);
      } catch (err) {
        console.error(err);
        setError('Service not found');
      }
    };
    fetchService();
  }, [id]);

  const nextImage = () => {
    if (service?.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === service.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (service?.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? service.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (error) return <div className="description-error">{error}</div>;
  if (!service) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="description-container pb-5">
        {service.images && service.images.length > 0 && (
          <div className="w-full max-w-6xl mx-auto mb-8 px-2 pt-2">
            <div className="relative w-full h-96 md:h-[500px]  overflow-hidden rounded-xl shadow-2xl">
              <img
                src={service.images[currentImageIndex]}
                alt={`${service.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300 "
                onError={(e) => (e.target.src = '')}
              />

              {service.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2  bg-black/50 hover:bg-opacity-80 text-white border-none w-12 h-12 md:w-14 md:h-14 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-opacity-80 text-white border-none w-12 h-12 md:w-14 md:h-14 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {service.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {service.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-blue-500 transform scale-125' 
                        : 'bg-gray-300 hover:bg-gray-500'
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="description-content px-4 max-w-6xl mx-auto">
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

          <div className="service-footer ">
            <span>Price: KES {service.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
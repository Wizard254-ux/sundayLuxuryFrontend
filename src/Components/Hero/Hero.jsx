import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import img1 from "../../assets/Hero1.jpg";
import img2 from "../../assets/Hero2.jpg";
import img3 from "../../assets/Hero3.jpg";
import img4 from "../../assets/Hero4.jpg";
import img5 from "../../assets/Hero6.jpg";

const slides = [
  {
    image: img1,
    heading: "Welcome",
    subtext: "Discover serenity and peace in every touch",
  },
  {
    image: img2,
    heading: "Indulge",
    subtext: "Perfect grooming for that Stylish Look",
  },
  {
    image: img3,
    heading: "Rejuvenate",
    subtext: "Soothing experience combined with Expert Care",
  },
  {
    image: img4,
    heading: "Unwind",
    subtext: "Relax your body, Clear your Mind, Uplift your Spirit",
  },
  {
    image: img5,
    heading: "Refresh",
    subtext: "Pampered Care. Expert Touch.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play logic - changes every second
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3000); // Changed to 3 seconds
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  // Navigation functions
  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Event handlers for pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={slides[current].image}
        alt={`Slide ${current + 1}`}
        className="hero-image"
        key={current} // Force re-render for animation
      />

      <div className="hero-text">
        <h1>{slides[current].heading}</h1>
        <p>{slides[current].subtext}</p>
      </div>

      {/* Navigation Buttons */}
      <button
        className="nav-button nav-button-prev"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        className="nav-button nav-button-next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

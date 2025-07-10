import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import img1 from '../../assets/Hero1.jpg';
import img2 from '../../assets/Hero2.jpg';
import img3 from '../../assets/Hero3.jpg';
import img4 from '../../assets/Hero4.jpg';
import img5 from '../../assets/Hero6.jpg';


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

  // Auto-play logic
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  // Event handlers for long-press
  const handlePressStart = () => setIsPaused(true);
  const handlePressEnd = () => setIsPaused(false);

  return (
    <div
      className="hero"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <img
        src={slides[current].image}
        alt={`Slide ${current + 1}`}
        className="hero-image"
      />
      <div className="hero-text">
        <h1>{slides[current].heading}</h1>
        <p>{slides[current].subtext}</p>
      </div>
    </div>
  );
};

export default Hero;
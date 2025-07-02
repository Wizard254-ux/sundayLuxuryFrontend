import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import img1 from '../../assets/hair.jpeg';
import img2 from '../../assets/entrance.jpeg';
import img3 from '../../assets/picture 2.jpeg';
import img4 from '../../assets/picture.jpeg';
import img5 from '../../assets/meza.jpeg';

const slides = [
  {
    image: img1,
    heading: "Relax Your Mind",
    subtext: "Discover serenity and peace in every touch",
  },
  {
    image: img2,
    heading: "Premium Beauty Care",
    subtext: "Where elegance meets expertise",
  },
  {
    image: img3,
    heading: "Gentlemen’s Spa",
    subtext: "Tailored massage experiences for men",
  },
  {
    image: img4,
    heading: "Glow Naturally",
    subtext: "Skincare that brings out your best",
  },
  {
    image: img5,
    heading: "Rejuvenate with Us",
    subtext: "From stress to bliss in one visit",
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

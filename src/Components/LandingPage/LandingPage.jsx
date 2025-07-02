import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Services from '../Services/Services';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import ContactSection from '../ContactSection/ContactSection';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Services showAll={false} />
      <ContactSection />
      <ReviewsSection />
      
    </div>
  );
};

export default LandingPage;

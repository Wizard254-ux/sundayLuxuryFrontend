import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Services from '../Services/Services';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import ContactSection from '../ContactSection/ContactSection';

const LandingPage = () => {
  useEffect(() => {
    // Function to handle scrolling to section based on hash
    const handleScrollToSection = () => {
      const hash = window.location.hash;
      
      if (hash) {
        const sectionId = hash.substring(1);
        
        // Try to find element immediately
        let element = document.getElementById(sectionId);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // If element not found, wait a bit for components to render
          setTimeout(() => {
            element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 200);
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Handle initial page load with delay to ensure components are rendered
    setTimeout(handleScrollToSection, 100);

    // Handle hash changes
    const handleHashChange = () => {
      setTimeout(handleScrollToSection, 50);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <Services showAll={false} />
      <ContactSection />
      <ReviewsSection />
    </div>
  );
};

export default LandingPage;
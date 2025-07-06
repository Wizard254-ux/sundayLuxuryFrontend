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
        // Remove the # from the hash
        const sectionId = hash.substring(1);
        
        // Debug logging
        console.log('Hash found:', hash);
        console.log('Looking for element with ID:', sectionId);
        
        // Find the element with the matching ID
        const element = document.getElementById(sectionId);
        
        if (element) {
          console.log('Element found, scrolling to:', element);
          // Scroll to the element with smooth behavior
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          console.log('Element not found with ID:', sectionId);
          // List all elements with IDs for debugging
          const allElementsWithIds = document.querySelectorAll('[id]');
          console.log('Available elements with IDs:', Array.from(allElementsWithIds).map(el => el.id));
        }
      }
    };

    // Handle initial page load
    handleScrollToSection();

    // Handle hash changes (when user clicks links or manually changes URL)
    const handleHashChange = () => {
      handleScrollToSection();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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
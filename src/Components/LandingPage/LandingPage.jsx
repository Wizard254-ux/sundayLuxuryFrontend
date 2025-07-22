import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import AboutUs from '../AboutUs/AboutUs';
import OurTeam from '../OurTeam/OurTeam';
import Footer from '../Footer/Footer';

const LandingPage = () => {

  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <AboutUs />
      {/* <OurTeam /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
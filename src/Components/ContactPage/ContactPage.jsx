import React from 'react';
import Navbar from '../Navbar/Navbar';
import ContactSection from '../ContactSection/ContactSection';
import Footer from '../Footer/Footer';

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
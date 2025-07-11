import React from 'react';
import Navbar from '../Navbar/Navbar';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import Footer from '../Footer/Footer';

const ReviewsPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <ReviewsSection />
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
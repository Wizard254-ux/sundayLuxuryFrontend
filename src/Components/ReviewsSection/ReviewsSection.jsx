import React from 'react';
import './ReviewsSection.css';

const reviews = [
  {
    name: 'Sarah M.',
    treatment: 'Signature Facial',
    review:
      '“The most relaxing experience I’ve ever had. The staff is incredibly professional and the atmosphere is pure bliss.”',
    rating: 5,
  },
  {
    name: 'Michael R.',
    treatment: 'Deep Tissue Massage',
    review:
      '“As a busy executive, SereniGlow is my sanctuary. The massage therapy here is unmatched – I leave feeling completely renewed.”',
    rating: 5,
  },
  {
    name: 'Emily & David',
    treatment: 'Couples Retreat',
    review:
      '“Our couples retreat was magical. Perfect for our anniversary celebration. We’ll definitely be returning!”',
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section" id="reviews">
      <h2>What Our Clients Say</h2>
      <p className="reviews-intro">
        Real experiences from our valued guests who found their moment of serenity
      </p>
      <div className="reviews-grid">
        {reviews.map((r, idx) => (
          <div className="review-card" key={idx}>
            <div className="stars">
              {'★'.repeat(r.rating)}<span className="dim">{"★".repeat(5 - r.rating)}</span>
            </div>
            <p className="review-text">{r.review}</p>
            <p className="review-name">{r.name}</p>
            <p className="review-treatment">{r.treatment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;

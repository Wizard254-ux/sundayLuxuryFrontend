import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'error', 'success', 'info'
  const [formData, setFormData] = useState({
    name: '',
    treatment: '',
    review: '',
    rating: 5
  });

  // Fetch reviews from backend
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sundayluxury.onrender.com/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data);
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (message, type) => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 5000); // Hide after 5 seconds
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear status message when user starts typing in review field
    if (name === 'review' && statusMessage) {
      setStatusMessage('');
      setStatusType('');
    }
  };

  const validateForm = () => {
    // Check if review is too short
    if (formData.review.trim().length < 10) {
      showStatus('Review is too short. Please write at least 10 characters.', 'error');
      return false;
    }

    // Check if name is empty
    if (formData.name.trim().length === 0) {
      showStatus('Please enter your name.', 'error');
      return false;
    }

    // Check if treatment is selected
    if (formData.treatment.trim().length === 0) {
      showStatus('Please select a treatment.', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://sundayluxury.onrender.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newReview = await response.json();
        console.log(newReview);
        setReviews(prev => [newReview.data, ...prev]);
        setFormData({
          name: '',
          treatment: '',
          review: '',
          rating: 5
        });
        setShowForm(false);
        showStatus('Review submitted successfully!', 'success');
      } else {
        showStatus('Error submitting review. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showStatus('Error submitting review. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Get reviews to display based on showAllReviews state
  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 6);
  const hasMoreReviews = reviews.length > 6;

  return (
    <section className="reviews-section" id="reviews">
      <h2>What Our Clients Say</h2>
      <p className="reviews-intro">
        Real experiences from our valued guests who found their moment of serenity
      </p>
      
      {/* Status Message */}
      {statusMessage && (
        <div className={`status-message ${statusType}`}>
          {statusMessage}
        </div>
      )}
      
      <div className="reviews-actions">
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
        <button 
          className="btn-secondary" 
          onClick={fetchReviews}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Reviews'}
        </button>
      </div>

      {showForm && (
        <div className="review-form-container">
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="treatment">Treatment:</label>
              <select
                id="treatment"
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a treatment</option>
                <option value="Signature Facial">Signature Facial</option>
                <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                <option value="Couples Retreat">Couples Retreat</option>
                <option value="Aromatherapy">Aromatherapy</option>
                <option value="Hot Stone Massage">Hot Stone Massage</option>
                <option value="Body Wrap">Body Wrap</option>
                <option value="Manicure & Pedicure">Manicure & Pedicure</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                interactive={true}
              />
            </div>

            <div className="form-group">
              <label htmlFor="review">Your Review:</label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                required
                placeholder="Share your experience with us... (minimum 10 characters)"
                rows="4"
              />
              <div className="character-count">
                {formData.review.length}/10 characters minimum
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reviews-grid">
        {loading && reviews.length === 0 ? (
          <div className="loading">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="no-reviews">No reviews yet. Be the first to share your experience!</div>
        ) : (
          reviewsToShow?.map((r, idx) => (
            <div className="review-card" key={r._id || idx}>
              <StarRating rating={r.rating} />
              <p className="review-text">"{r.review}"</p>
              <p className="review-name">{r.name}</p>
              <p className="review-treatment">{r.treatment}</p>
              {r.createdAt && (
                <p className="review-date">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {hasMoreReviews && (
        <div className="see-more-container">
          <button 
            className="btn-secondary see-more-btn" 
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `See More (${reviews.length - 6} more)`}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
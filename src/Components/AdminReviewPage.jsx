import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin/Adim'; // Adjust the import path as necessary
const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);

  // Fetch all reviews (including unapproved ones for admin)
  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sundayluxury.onrender.com/api/reviews/admin/all');
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data || data);
      } else {
        alert('Error fetching reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  // Delete single review
  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await fetch(`https://sundayluxury.onrender.com/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== reviewId));
        alert('Review deleted successfully');
      } else {
        alert('Error deleting review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Delete all reviews
  const deleteAllReviews = async () => {
    if (!window.confirm('Are you sure you want to delete ALL reviews? This action cannot be undone!')) {
      return;
    }

    if (!window.confirm('This will permanently delete all reviews. Are you absolutely sure?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await fetch('https://sundayluxury.onrender.com/api/reviews/admin/delete-all', {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews([]);
        alert('All reviews deleted successfully');
      } else {
        alert('Error deleting all reviews');
      }
    } catch (error) {
      console.error('Error deleting all reviews:', error);
      alert('Error deleting all reviews');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Delete selected reviews
  const deleteSelectedReviews = async () => {
    if (selectedReviews.length === 0) {
      alert('Please select reviews to delete');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedReviews.length} selected reviews?`)) {
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await fetch('https://sundayluxury.onrender.com/api/reviews/admin/delete-multiple', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewIds: selectedReviews }),
      });

      if (response.ok) {
        setReviews(reviews.filter(review => !selectedReviews.includes(review._id)));
        setSelectedReviews([]);
        alert('Selected reviews deleted successfully');
      } else {
        alert('Error deleting selected reviews');
      }
    } catch (error) {
      console.error('Error deleting selected reviews:', error);
      alert('Error deleting selected reviews');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Toggle review selection
  const toggleReviewSelection = (reviewId) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  // Select all reviews
  const selectAllReviews = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map(review => review._id));
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const StarDisplay = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div>
              <AdminNavbar />

    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews Management</h1>
          <p className="text-gray-600">Manage all customer reviews</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchAllReviews}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh Reviews'}
              </button>
              
              <button
                onClick={selectAllReviews}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {selectedReviews.length === reviews.length ? 'Deselect All' : 'Select All'}
              </button>
              
              {selectedReviews.length > 0 && (
                <button
                  onClick={deleteSelectedReviews}
                  disabled={deleteLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Delete Selected ({selectedReviews.length})
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <span className="text-sm text-gray-600 self-center">
                Total Reviews: {reviews.length}
              </span>
              
              <button
                onClick={deleteAllReviews}
                disabled={deleteLoading || reviews.length === 0}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete All'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading reviews...</div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">No reviews found</div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${
                  selectedReviews.includes(review._id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-transparent hover:shadow-lg'
                }`}
              >
                {/* Selection Checkbox */}
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedReviews.includes(review._id)}
                      onChange={() => toggleReviewSelection(review._id)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Select</span>
                  </label>
                  
                  <button
                    onClick={() => deleteReview(review._id)}
                    disabled={deleteLoading}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <StarDisplay rating={review.rating} />
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <p className="text-gray-800 italic mb-3 line-clamp-3">
                    "{review.review}"
                  </p>
                </div>

                {/* Review Details */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{review.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Treatment:</span>
                      <p className="font-medium">{review.treatment}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">
                        {new Date(review.createdAt).toLocaleDateString()} at{' '}
                        {new Date(review.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex gap-2 mt-4">
                
                  
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    review.isVisible 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {review.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminReviewsPage;
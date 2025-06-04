import React, { useState } from 'react';
import '../../styles/global.css';

const Ratings = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the rating to a backend
    console.log({ rating, comment });
    // Reset form
    setRating(0);
    setComment('');
    alert('Rating submitted successfully!');
  };
  
  return (
    <div className="container ratings-page">
      <div className="card ratings-container">
        <h2 className="ratings-title">Rate Volunteer</h2>
        <p className="ratings-description">
          Share your feedback about the volunteer who assisted you
        </p>
        
        <form onSubmit={handleSubmit} className="rating-form">
          <label className="rating-label">Your Rating</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star}
                onClick={() => handleRatingChange(star)}
                style={{ 
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: star <= rating ? '#FFD700' : '#e0e0e0' 
                }}
              >
                ★
              </span>
            ))}
            <span className="rating-value">{rating} / 5</span>
          </div>
          
          <label className="rating-label" htmlFor="comment">
            Comments (Optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this volunteer..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              minHeight: '120px'
            }}
          />
          
          <button 
            type="submit" 
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              maxWidth: '200px',
              margin: '20px auto',
              display: 'block'
            }}
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ratings;
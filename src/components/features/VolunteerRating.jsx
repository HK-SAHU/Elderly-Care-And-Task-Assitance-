import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Rating } from 'react-simple-star-rating';
import { volunteerService } from '../../services/api';
import './VolunteerRating.css';

const VolunteerRating = ({ volunteerId, volunteerName }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previousRating, setPreviousRating] = useState(null);
  
  useEffect(() => {
    // Check if user has already rated this volunteer
    const checkPreviousRating = async () => {
      try {
        const response = await volunteerService.getUserRatingForVolunteer(volunteerId);
        if (response.data) {
          setPreviousRating(response.data);
          setRating(response.data.rating);
          setComment(response.data.comment || '');
        }
      } catch (err) {
        console.error('Error fetching previous rating:', err);
      }
    };
    
    if (volunteerId) {
      checkPreviousRating();
    }
  }, [volunteerId]);
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const ratingData = {
        rating,
        comment
      };
      
      if (previousRating) {
        await volunteerService.updateReview(volunteerId, ratingData);
      } else {
        await volunteerService.addReview(volunteerId, ratingData);
      }
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit rating. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="volunteer-rating-card">
      <Card.Header as="h5">
        {t('Rate Volunteer')}: {volunteerName}
      </Card.Header>
      <Card.Body>
        {submitted && (
          <Alert variant="success">
            {t('ratings.thankYou')}
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('Your Rating')}</Form.Label>
            <div className="rating-container">
              <Rating
                onClick={handleRatingChange}
                initialValue={rating}
                size={30}
                transition
                fillColor="#FFD700"
                emptyColor="#CCCCCC"
              />
              <span className="rating-value">{rating} / 5</span>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Comments (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Share your experience with this volunteer..."
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading || rating === 0}
            className="submit-rating-btn"
          >
            {loading ? 'Submitting...' : t('Submit Rating')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default VolunteerRating;
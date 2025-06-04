import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, ListGroup } from 'react-bootstrap';
import { locationService } from '../../services/api';
import './LocationCheckIn.css';

const LocationCheckIn = () => {
  const [location, setLocation] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  // Fetch check-in history on component mount
  useEffect(() => {
    fetchCheckIns();
  }, []);
  
  const fetchCheckIns = async () => {
    try {
      setLoadingHistory(true);
      const response = await locationService.getCheckIns();
      setCheckIns(response.data);
    } catch (err) {
      console.error('Failed to fetch check-ins:', err);
    } finally {
      setLoadingHistory(false);
    }
  };
  
  const handleCheckIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get location name using reverse geocoding
          try {
            const locationData = {
              latitude,
              longitude,
              timestamp: new Date().toISOString()
            };
            
            const response = await locationService.checkIn(locationData);
            setCheckIns([response.data, ...checkIns]);
            setLocation(response.data);
            setLoading(false);
          } catch (err) {
            console.error('Error during check-in:', err);
            setError('Failed to complete check-in. Please try again.');
            setLoading(false);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError(`Location error: ${err.message}`);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="location-check-in">
      <Card>
        <Card.Header as="h5">Location Check-In</Card.Header>
        <Card.Body>
          <Card.Text>
            Check in at your current location to let caregivers know where you are.
          </Card.Text>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button 
            variant="primary" 
            onClick={handleCheckIn} 
            disabled={loading}
            className="check-in-button"
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Checking in...</span>
              </>
            ) : (
              "Check In Now"
            )}
          </Button>
          
          {location && (
            <div className="current-location mt-3">
              <h6>Latest Check-In:</h6>
              <p>
                <strong>Location:</strong> {location.locationName || 'Unknown location'}
                <br />
                <strong>Time:</strong> {new Date(location.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Card className="mt-4">
        <Card.Header as="h5">Check-In History</Card.Header>
        <Card.Body>
          {loadingHistory ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : checkIns.length === 0 ? (
            <p>No check-ins recorded yet.</p>
          ) : (
            <ListGroup variant="flush">
              {checkIns.map((checkIn, index) => (
                <ListGroup.Item key={checkIn._id || index} className="check-in-item">
                  <div className="check-in-location">
                    {checkIn.locationName || 'Unknown location'}
                  </div>
                  <div className="check-in-time">
                    {new Date(checkIn.timestamp).toLocaleString()}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LocationCheckIn;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/global.css';

const Location = () => {
  const [checkIns, setCheckIns] = useState([]);
  
  const handleCheckIn = () => {
    const now = new Date();
    const newCheckIn = {
      id: Date.now(),
      timestamp: now.toLocaleString(),
      location: "Current Location" // In a real app, this would use geolocation
    };
    
    setCheckIns([newCheckIn, ...checkIns]);
  };
  
  return (
    <div className="location-page">
      <div className="location-container">
        <h2 className="location-title">Location Check-In</h2>
        <p className="location-description">
          Check in at your current location to let caregivers know where you are.
        </p>
        
        <button 
          className="check-in-button" 
          onClick={handleCheckIn}
        >
          Check In Now
        </button>
        
        <div className="history-section">
          <h3 className="history-title">Check-In History</h3>
          {checkIns.length === 0 ? (
            <p>No check-ins recorded yet.</p>
          ) : (
            <ul className="check-in-list">
              {checkIns.map(checkIn => (
                <li key={checkIn.id} className="check-in-item">
                  <span className="check-in-time">{checkIn.timestamp}</span>
                  <span className="check-in-location">{checkIn.location}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
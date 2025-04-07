import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './EmergencySOS.css';

const EmergencySOS = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentAlert, setSentAlert] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', relation: 'Son', phone: '+1 (555) 123-4567', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', relation: 'Daughter', phone: '+1 (555) 987-6543', email: 'jane@example.com' },
    { id: 3, name: 'Dr. Robert Johnson', relation: 'Doctor', phone: '+1 (555) 456-7890', email: 'dr.johnson@example.com' }
  ]);

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setError('Unable to retrieve your location. Please enable location services.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleEmergency = () => {
    setIsSending(true);
    
    // Simulate sending emergency alert
    setTimeout(() => {
      setIsSending(false);
      setSentAlert(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSentAlert(false);
      }, 5000);
    }, 2000);
    
    // In a real app, this would connect to a backend service using WebSockets
    // socket.emit('emergency', {
    //   userId: user.id,
    //   userName: user.name,
    //   location: location,
    //   timestamp: new Date(),
    //   contacts: contacts
    // });
  };

  const addEmergencyContact = (e) => {
    e.preventDefault();
    // This would typically connect to a backend API
    const newContact = {
      id: contacts.length + 1,
      name: e.target.name.value,
      relation: e.target.relation.value,
      phone: e.target.phone.value,
      email: e.target.email.value
    };
    
    setContacts([...contacts, newContact]);
    
    // Reset form
    e.target.reset();
  };

  return (
    <div className="emergency-container">
      <h1 className="feature-title">Emergency SOS</h1>
      <p className="feature-description">
        In case of emergency, press the SOS button below to alert your emergency contacts.
      </p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {sentAlert && (
        <div className="alert alert-success">
          Emergency alert sent successfully to your contacts!
        </div>
      )}
      
      <div className="sos-button-container">
        <button 
          className={`sos-button ${isSending ? 'sending' : ''}`} 
          onClick={handleEmergency}
          disabled={isSending || sentAlert}
        >
          <FaExclamationTriangle className="sos-icon" />
          {isSending ? 'Sending Alert...' : 'SOS Emergency Alert'}
        </button>
        
        {location && (
          <div className="location-info">
            <p>Your current location will be shared:</p>
            <p>Latitude: {location.latitude.toFixed(6)}</p>
            <p>Longitude: {location.longitude.toFixed(6)}</p>
          </div>
        )}
      </div>
      
      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contacts-list">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <h3>{contact.name}</h3>
              <p><strong>Relation:</strong> {contact.relation}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
            </div>
          ))}
        </div>
        
        <div className="add-contact-form">
          <h3>Add Emergency Contact</h3>
          <form onSubmit={addEmergencyContact}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="form-control" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="relation">Relation</label>
              <input type="text" id="relation" name="relation" className="form-control" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="form-control" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>
            
            <button type="submit" className="btn-primary">Add Contact</button>
          </form>
        </div>
      </div>
      
      <div className="floating-sos-button" onClick={handleEmergency}>
        <FaExclamationTriangle />
        SOS
      </div>
    </div>
  );
};

export default EmergencySOS;
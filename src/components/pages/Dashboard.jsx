import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ isAuthenticated }) => {
  // If not authenticated, show a welcome page
  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to ElderCare</h1>
          <p className="welcome-subtitle">Helping families take care of their elderly loved ones with ease and dignity</p>
        </div>
        
        <div className="features-section">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h3>Task Scheduling</h3>
              <p>Schedule daily tasks and get reminders for medicine, doctor visits, and more.</p>
              <ul>
                <li>Create daily, weekly, or monthly tasks</li>
                <li>Set reminders for important appointments</li>
                <li>Track completion status</li>
                <li>Organize tasks by category</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Go to Task Scheduler</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-pills"></i>
              </div>
              <h3>Medicine Tracker</h3>
              <p>Track medications, dosages, and schedules with alerts for missed doses.</p>
              <ul>
                <li>Log medication details and dosages</li>
                <li>Set multiple time reminders per day</li>
                <li>Track medication adherence</li>
                <li>Manage prescription refills</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Go to Medicine Tracker</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h3>Grocery Ordering</h3>
              <p>Request groceries and essentials with the help of family members or volunteers.</p>
              <ul>
                <li>Create shopping lists</li>
                <li>Set priority levels for urgent needs</li>
                <li>Connect with volunteer shoppers</li>
                <li>Track order status in real-time</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Go to Grocery Ordering</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <h3>Emergency SOS</h3>
              <p>One-tap emergency button that notifies family members and volunteers.</p>
              <ul>
                <li>Send instant alerts to emergency contacts</li>
                <li>Share location information</li>
                <li>Automated emergency calls</li>
                <li>Quick access to medical information</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Go to Emergency SOS</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Volunteer Assistance</h3>
              <p>Connect with verified volunteers for transportation, shopping, and more.</p>
              <ul>
                <li>Browse local volunteer profiles</li>
                <li>Request specific assistance</li>
                <li>Schedule volunteer visits</li>
                <li>Communicate directly with helpers</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Find Volunteers</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Real-Time Chat</h3>
              <p>Stay connected with family members and volunteers through secure messaging.</p>
              <ul>
                <li>Private and group conversations</li>
                <li>Share photos and documents</li>
                <li>Get notifications for new messages</li>
                <li>Voice and video call options</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Start Chatting</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <h3>Voice Tasks</h3>
              <p>Create tasks using your voice - no typing needed!</p>
              <ul>
                <li>Voice-to-text conversion</li>
                <li>Natural language processing</li>
                <li>Hands-free operation</li>
                <li>Voice command recognition</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Try Voice Tasks</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location Check-ins</h3>
              <p>Automatically check in at important locations.</p>
              <ul>
                <li>GPS location tracking</li>
                <li>Automatic check-ins</li>
                <li>Location history</li>
                <li>Privacy controls</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Check Location</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Volunteer Ratings</h3>
              <p>Rate and review volunteers who help you.</p>
              <ul>
                <li>Rating system</li>
                <li>Feedback collection</li>
                <li>Volunteer recognition</li>
                <li>Quality assurance</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Rate Volunteers</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Health Log</h3>
              <p>Track health metrics and share with caregivers and doctors.</p>
              <ul>
                <li>Record vital signs</li>
                <li>Track symptoms</li>
                <li>Generate health reports</li>
                <li>Share with healthcare providers</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Go to Health Log</Link>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community Forum</h3>
              <p>Connect with others in similar situations for support and advice.</p>
              <ul>
                <li>Join discussion groups</li>
                <li>Share experiences</li>
                <li>Get advice from others</li>
                <li>Access resources and guides</li>
              </ul>
              <div className="card-button-container">
                <Link to="/login" className="btn">Join Forum</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show the dashboard
  return (
    <div className="container">
      <div className="welcome-section">
        <h1>Welcome to ElderCare</h1>
        <p>Helping families take care of their elderly loved ones with ease and dignity</p>
      </div>
      
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Task Scheduling</h3>
            <p>Schedule daily tasks and get reminders for medicine, doctor visits, and more.</p>
            <ul>
              <li>Create daily, weekly, or monthly tasks</li>
              <li>Set reminders for important appointments</li>
              <li>Track completion status</li>
              <li>Organize tasks by category</li>
            </ul>
            <div className="card-button-container">
              <Link to="/tasks" className="btn">Go to Task Scheduler</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-pills"></i>
            </div>
            <h3>Medicine Tracker</h3>
            <p>Track medications, dosages, and schedules with alerts for missed doses.</p>
            <ul>
              <li>Log medication details and dosages</li>
              <li>Set multiple time reminders per day</li>
              <li>Track medication adherence</li>
              <li>Manage prescription refills</li>
            </ul>
            <div className="card-button-container">
              <Link to="/medicine" className="btn">Go to Medicine Tracker</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3>Grocery Ordering</h3>
            <p>Request groceries and essentials with the help of family members or volunteers.</p>
            <ul>
              <li>Create shopping lists</li>
              <li>Set priority levels for urgent needs</li>
              <li>Connect with volunteer shoppers</li>
              <li>Track order status in real-time</li>
            </ul>
            <div className="card-button-container">
              <Link to="/grocery" className="btn">Go to Grocery Ordering</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3>Emergency SOS</h3>
            <p>One-tap emergency button that notifies family members and volunteers.</p>
            <ul>
              <li>Send instant alerts to emergency contacts</li>
              <li>Share location information</li>
              <li>Automated emergency calls</li>
              <li>Quick access to medical information</li>
            </ul>
            <div className="card-button-container">
              <Link to="/emergency" className="btn">Go to Emergency SOS</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3>Volunteer Assistance</h3>
            <p>Connect with verified volunteers for transportation, shopping, and more.</p>
            <ul>
              <li>Browse local volunteer profiles</li>
              <li>Request specific assistance</li>
              <li>Schedule volunteer visits</li>
              <li>Communicate directly with helpers</li>
            </ul>
            <div className="card-button-container">
              <Link to="/volunteers" className="btn">Find Volunteers</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Real-Time Chat</h3>
            <p>Stay connected with family members and volunteers through secure messaging.</p>
            <ul>
              <li>Private and group conversations</li>
              <li>Share photos and documents</li>
              <li>Get notifications for new messages</li>
              <li>Voice and video call options</li>
            </ul>
            <div className="card-button-container">
              <Link to="/chat" className="btn">Start Chatting</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-microphone"></i>
            </div>
            <h3>Voice Tasks</h3>
            <p>Create tasks using your voice - no typing needed!</p>
            <ul>
              <li>Voice-to-text conversion</li>
              <li>Natural language processing</li>
              <li>Hands-free operation</li>
              <li>Voice command recognition</li>
            </ul>
            <div className="card-button-container">
              <Link to="/voice-tasks" className="btn">Try Voice Tasks</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Location Check-ins</h3>
            <p>Automatically check in at important locations.</p>
            <ul>
              <li>GPS location tracking</li>
              <li>Automatic check-ins</li>
              <li>Location history</li>
              <li>Privacy controls</li>
            </ul>
            <div className="card-button-container">
              <Link to="/location-check-in" className="btn">Check Location</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Volunteer Ratings</h3>
            <p>Rate and review volunteers who help you.</p>
            <ul>
              <li>Rating system</li>
              <li>Feedback collection</li>
              <li>Volunteer recognition</li>
              <li>Quality assurance</li>
            </ul>
            <div className="card-button-container">
              <Link to="/volunteer-ratings" className="btn">Rate Volunteers</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Health Log</h3>
            <p>Track health metrics and share with caregivers and doctors.</p>
            <ul>
              <li>Record vital signs</li>
              <li>Track symptoms</li>
              <li>Generate health reports</li>
              <li>Share with healthcare providers</li>
            </ul>
            <div className="card-button-container">
              <Link to="/health" className="btn">Go to Health Log</Link>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Community Forum</h3>
            <p>Connect with others in similar situations for support and advice.</p>
            <ul>
              <li>Join discussion groups</li>
              <li>Share experiences</li>
              <li>Get advice from others</li>
              <li>Access resources and guides</li>
            </ul>
            <div className="card-button-container">
              <Link to="/forum" className="btn">Join Forum</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
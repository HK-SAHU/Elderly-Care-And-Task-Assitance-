import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1>Welcome to ElderCare</h1>
        <p>Helping families take care of their elderly loved ones with ease and dignity</p>
        {!isAuthenticated && (
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        )}
      </div>
      
      <div className="features-overview">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Task Scheduling</h3>
            <p>Schedule daily tasks and get reminders for medicine, doctor visits, and more.</p>
            <ul className="feature-details">
              <li>Create daily, weekly, or monthly tasks</li>
              <li>Set reminders for important appointments</li>
              <li>Track completion status</li>
              <li>Organize tasks by category</li>
            </ul>
            {isAuthenticated && (
              <Link to="/tasks" className="feature-link">Go to Task Scheduler</Link>
            )}
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Medicine Tracker</h3>
            <p>Track medications, dosages, and schedules with alerts for missed doses.</p>
            <ul className="feature-details">
              <li>Log medication details and dosages</li>
              <li>Set multiple time reminders per day</li>
              <li>Track medication adherence</li>
              <li>Manage prescription refills</li>
            </ul>
            {isAuthenticated && (
              <Link to="/medicine" className="feature-link">Go to Medicine Tracker</Link>
            )}
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3>Grocery Ordering</h3>
            <p>Request groceries and essentials with the help of family members or volunteers.</p>
            <ul className="feature-details">
              <li>Create shopping lists</li>
              <li>Set priority levels for urgent needs</li>
              <li>Connect with volunteer shoppers</li>
              <li>Track order status in real-time</li>
            </ul>
            {isAuthenticated && (
              <Link to="/grocery" className="feature-link">Go to Grocery Ordering</Link>
            )}
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🆘</div>
            <h3>Emergency SOS</h3>
            <p>One-tap emergency button that notifies family members and volunteers.</p>
            <ul className="feature-details">
              <li>Send instant alerts to emergency contacts</li>
              <li>Share current location automatically</li>
              <li>Include health information with alerts</li>
              <li>Connect to local emergency services</li>
            </ul>
            {isAuthenticated && (
              <Link to="/emergency" className="feature-link">Go to Emergency SOS</Link>
            )}
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Volunteer Assistance</h3>
            <p>Connect with verified volunteers for transportation, shopping, and more.</p>
            <ul className="feature-details">
              <li>Browse local volunteer profiles</li>
              <li>Request specific assistance</li>
              <li>Schedule transportation services</li>
              <li>Rate and review volunteer help</li>
            </ul>
            {isAuthenticated && (
              <Link to="/volunteers" className="feature-link">Find Volunteers</Link>
            )}
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Real-Time Chat</h3>
            <p>Stay connected with family members and volunteers through secure messaging.</p>
            <ul className="feature-details">
              <li>Private and group conversations</li>
              <li>Share photos and documents</li>
              <li>Voice and video call options</li>
              <li>Message notifications</li>
            </ul>
            {isAuthenticated && (
              <Link to="/messages" className="feature-link">Open Messages</Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-quote">"ElderCare has made caring for my mother so much easier. The medication reminders have been a lifesaver!"</div>
            <div className="testimonial-author">- Sarah J., Caregiver</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"As a volunteer, I love how easy it is to see who needs help in my neighborhood and offer my assistance."</div>
            <div className="testimonial-author">- Michael T., Volunteer</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"The grocery ordering feature helps me ensure my dad always has fresh food, even when I can't visit in person."</div>
            <div className="testimonial-author">- Lisa M., Family Member</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import './VolunteerMatching.css';

const VolunteerMatching = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [location, setLocation] = useState('');
  const [taskType, setTaskType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    // Simulate fetching volunteers from API
    const mockVolunteers = [
      { id: 1, name: 'Sarah Johnson', age: 28, location: 'Downtown', rating: 4.8, tasks: 56, bio: 'Nursing student who loves helping seniors in my free time.', skills: ['Transportation', 'Grocery Shopping', 'Companionship'] },
      { id: 2, name: 'Michael Chen', age: 35, location: 'Westside', rating: 4.9, tasks: 124, bio: 'Retired nurse with 10+ years of experience caring for elderly patients.', skills: ['Medical Assistance', 'Transportation', 'Meal Preparation'] },
      { id: 3, name: 'David Wilson', age: 42, location: 'Northside', rating: 4.7, tasks: 87, bio: 'I have been volunteering with seniors for over 5 years and find it very rewarding.', skills: ['Home Repairs', 'Yard Work', 'Transportation'] },
      { id: 4, name: 'Emily Rodriguez', age: 31, location: 'Eastside', rating: 4.6, tasks: 63, bio: 'Social worker specializing in elder care. Available weekends.', skills: ['Companionship', 'Grocery Shopping', 'Administrative Help'] }
    ];
    
    setVolunteers(mockVolunteers);
    
    // Simulate fetching tasks from API
    const mockTasks = [
      { id: 1, type: 'Transportation', location: 'Downtown', date: '2023-11-15', time: '10:00 AM', requester: 'John Smith', description: 'Need a ride to doctor appointment', status: 'open' },
      { id: 2, type: 'Grocery Shopping', location: 'Westside', date: '2023-11-16', time: '2:00 PM', requester: 'Mary Johnson', description: 'Weekly grocery shopping assistance needed', status: 'open' },
      { id: 3, type: 'Home Repair', location: 'Northside', date: '2023-11-18', time: '11:00 AM', requester: 'Robert Davis', description: 'Need help fixing a leaky faucet', status: 'open' },
      { id: 4, type: 'Companionship', location: 'Eastside', date: '2023-11-20', time: '3:00 PM', requester: 'Elizabeth Brown', description: 'Looking for someone to play chess with', status: 'open' }
    ];
    
    setTasks(mockTasks);
    
    // Check if user is registered as a volunteer
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isVolunteer) {
      setIsVolunteer(true);
    }
  }, []);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the request to a backend API
    const newTask = {
      id: tasks.length + 1,
      type: taskType,
      location: location,
      date: date,
      time: '12:00 PM', // Default time
      requester: JSON.parse(localStorage.getItem('user')).name,
      description: description,
      status: 'open'
    };
    
    setTasks([...tasks, newTask]);
    
    // Reset form
    setLocation('');
    setTaskType('');
    setDate('');
    setDescription('');
    
    alert('Your volunteer request has been submitted successfully!');
  };

  const handleAcceptTask = (taskId) => {
    // In a real app, this would update the task status in the backend
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'accepted' } : task
    );
    
    setTasks(updatedTasks);
    alert('You have accepted this task. The requester will be notified.');
  };

  const handleRegisterAsVolunteer = () => {
    // In a real app, this would update the user profile in the backend
    const user = JSON.parse(localStorage.getItem('user'));
    user.isVolunteer = true;
    localStorage.setItem('user', JSON.stringify(user));
    
    setIsVolunteer(true);
    alert('You are now registered as a volunteer!');
  };

  return (
    <div className="volunteer-container">
      <h1 className="feature-title">Volunteer Assistance</h1>
      <p className="feature-description">
        Connect with verified volunteers for transportation, shopping, and more.
      </p>
      
      <div className="volunteer-tabs">
        <button 
          className={`tab-button ${activeTab === 'find' ? 'active' : ''}`}
          onClick={() => setActiveTab('find')}
        >
          Find Volunteers
        </button>
        <button 
          className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Request Assistance
        </button>
        {isVolunteer && (
          <button 
            className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Available Tasks
          </button>
        )}
        {!isVolunteer && (
          <button 
            className={`tab-button ${activeTab === 'become' ? 'active' : ''}`}
            onClick={() => setActiveTab('become')}
          >
            Become a Volunteer
          </button>
        )}
      </div>
      
      <div className="tab-content">
        {activeTab === 'find' && (
          <div className="volunteers-list">
            <div className="filter-bar">
              <input 
                type="text" 
                placeholder="Search by location..." 
                className="form-control"
              />
              <select className="form-control">
                <option value="">All Skills</option>
                <option value="transportation">Transportation</option>
                <option value="shopping">Grocery Shopping</option>
                <option value="medical">Medical Assistance</option>
                <option value="companionship">Companionship</option>
                <option value="homerepair">Home Repairs</option>
              </select>
              <button className="btn-primary">Filter</button>
            </div>
            
            <div className="volunteers-grid">
              {volunteers.map(volunteer => (
                <div key={volunteer.id} className="volunteer-card">
                  <div className="volunteer-header">
                    <div className="volunteer-avatar">
                      {volunteer.name.charAt(0)}
                    </div>
                    <div className="volunteer-info">
                      <h3>{volunteer.name}</h3>
                      <p><FaMapMarkerAlt /> {volunteer.location}</p>
                      <div className="volunteer-rating">
                        Rating: {volunteer.rating} ★ ({volunteer.tasks} tasks)
                      </div>
                    </div>
                  </div>
                  
                  <p className="volunteer-bio">{volunteer.bio}</p>
                  
                  <div className="volunteer-skills">
                    <h4>Skills:</h4>
                    <div className="skills-list">
                      {volunteer.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="btn-primary contact-btn">Contact</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'request' && (
          <div className="request-form-container">
            <form onSubmit={handleSubmitRequest} className="request-form">
              <div className="form-group">
                <label htmlFor="taskType">Type of Assistance</label>
                <select 
                  id="taskType" 
                  className="form-control" 
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  required
                >
                  <option value="">Select type of assistance</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Grocery Shopping">Grocery Shopping</option>
                  <option value="Medical Assistance">Medical Assistance</option>
                  <option value="Companionship">Companionship</option>
                  <option value="Home Repair">Home Repair</option>
                  <option value="Yard Work">Yard Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  className="form-control" 
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">Date Needed</label>
                <input 
                  type="date" 
                  id="date" 
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  className="form-control" 
                  rows="4"
                  placeholder="Describe what you need help with..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-request-btn">Submit Request</button>
            </form>
          </div>
        )}
        
        {activeTab === 'tasks' && isVolunteer && (
          <div className="tasks-container">
            <h2>Available Tasks</h2>
            
            <div className="tasks-list">
              {tasks.filter(task => task.status === 'open').map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.type}</h3>
                    <span className="task-status">{task.status}</span>
                  </div>
                  
                  <div className="task-details">
                    <p><strong>Requester:</strong> {task.requester}</p>
                    <p><FaMapMarkerAlt /> {task.location}</p>
                    <p><FaCalendarAlt /> {task.date} at {task.time}</p>
                    <p className="task-description">{task.description}</p>
                  </div>
                  
                  <div className="task-actions">
                    <button 
                      className="btn-accent accept-btn"
                      onClick={() => handleAcceptTask(task.id)}
                    >
                      <FaCheck /> Accept Task
                    </button>
                    <button className="btn-secondary details-btn">View Details</button>
                  </div>
                </div>
              ))}
              
              {tasks.filter(task => task.status === 'open').length === 0 && (
                <p className="no-tasks">No tasks available at the moment. Check back later!</p>
              )}
            </div>
            
            <h2>Your Accepted Tasks</h2>
            <div className="tasks-list">
              {tasks.filter(task => task.status === 'accepted').map(task => (
                <div key={task.id} className="task-card accepted">
                  <div className="task-header">
                    <h3>{task.type}</h3>
                    <span className="task-status accepted">{task.status}</span>
                  </div>
                  
                  <div className="task-details">
                    <p><strong>Requester:</strong> {task.requester}</p>
                    <p><FaMapMarkerAlt /> {task.location}</p>
                    <p><FaCalendarAlt /> {task.date} at {task.time}</p>
                    <p className="task-description">{task.description}</p>
                  </div>
                  
                  <div className="task-actions">
                    <button className="btn-secondary details-btn">View Details</button>
                    <button className="btn-primary contact-btn">Contact Requester</button>
                  </div>
                </div>
              ))}
              
              {tasks.filter(task => task.status === 'accepted').length === 0 && (
                <p className="no-tasks">You haven't accepted any tasks yet.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'become' && !isVolunteer && (
          <div className="become-volunteer-container">
            <div className="volunteer-info-card">
              <h2>Become a Volunteer</h2>
              <p>
                Join our community of volunteers helping seniors with daily tasks, transportation, 
                companionship, and more. As a volunteer, you can:
              </p>
              
              <ul className="benefits-list">
                <li>Choose tasks that fit your schedule and skills</li>
                <li>Make a meaningful difference in seniors' lives</li>
                <li>Build connections with people in your community</li>
                <li>Gain experience and develop new skills</li>
              </ul>
              
              <h3>Requirements:</h3>
              <ul className="requirements-list">
                <li>Be at least 18 years old</li>
                <li>Pass a background check</li>
                <li>Have reliable transportation (for transportation tasks)</li>
                <li>Commit to at least 2 hours per month</li>
              </ul>
              
              <div className="volunteer-form">
                <h3>Ready to help?</h3>
                <p>
                  Register as a volunteer to start browsing and accepting tasks in your area.
                </p>
                
                <button 
                  className="btn-primary register-btn"
                  onClick={handleRegisterAsVolunteer}
                >
                  Register as Volunteer
                </button>
              </div>
            </div>
            
            <div className="volunteer-testimonials">
              <h3>What Our Volunteers Say</h3>
              
              <div className="testimonial">
                <p>
                  "Volunteering with seniors has been one of the most rewarding experiences of my life. 
                  I've made wonderful friends and learned so much from their stories and wisdom."
                </p>
                <div className="testimonial-author">- James Wilson, Volunteer since 2021</div>
              </div>
              
              <div className="testimonial">
                <p>
                  "I started volunteering after my own grandmother needed help. Now I can give back 
                  to others in my community. The flexible schedule works perfectly with my busy life."
                </p>
                <div className="testimonial-author">- Maria Garcia, Volunteer since 2022</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerMatching;
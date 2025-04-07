import { useState, useEffect } from 'react';
import { FaHeartbeat, FaWalking, FaBed, FaWeight, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './HealthLog.css';

const HealthLog = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [healthData, setHealthData] = useState({
    steps: [],
    sleep: [],
    weight: [],
    heartRate: []
  });
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    steps: '',
    sleep: '',
    weight: '',
    heartRate: '',
    meals: '',
    medications: '',
    notes: ''
  });

  useEffect(() => {
    // Simulate fetching health data from API
    const generateMockData = () => {
      const today = new Date();
      const mockData = {
        steps: [],
        sleep: [],
        weight: [],
        heartRate: []
      };
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        mockData.steps.push({
          date: dateStr,
          value: Math.floor(Math.random() * 5000) + 3000
        });
        
        mockData.sleep.push({
          date: dateStr,
          value: Math.floor(Math.random() * 3) + 5
        });
        
        mockData.weight.push({
          date: dateStr,
          value: Math.floor(Math.random() * 5) + 150
        });
        
        mockData.heartRate.push({
          date: dateStr,
          value: Math.floor(Math.random() * 20) + 60
        });
      }
      
      return mockData;
    };
    
    setHealthData(generateMockData());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the data to a backend API
    alert('Health data submitted successfully!');
    
    // Reset form
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      steps: '',
      sleep: '',
      weight: '',
      heartRate: '',
      meals: '',
      medications: '',
      notes: ''
    });
  };

  return (
    <div className="health-container">
      <h1 className="feature-title">Health Log & Activity Tracker</h1>
      <p className="feature-description">
        Track your daily activities, sleep, and health metrics to maintain a healthy lifestyle.
      </p>
      
      <div className="health-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={`tab-button ${activeTab === 'sleep' ? 'active' : ''}`}
          onClick={() => setActiveTab('sleep')}
        >
          Sleep
        </button>
        <button 
          className={`tab-button ${activeTab === 'weight' ? 'active' : ''}`}
          onClick={() => setActiveTab('weight')}
        >
          Weight
        </button>
        <button 
          className={`tab-button ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          Add Entry
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="health-summary">
              <div className="health-card">
                <div className="health-icon">
                  <FaWalking />
                </div>
                <div className="health-data">
                  <h3>Steps</h3>
                  <div className="health-value">{healthData.steps[healthData.steps.length - 1]?.value}</div>
                  <div className="health-label">Today</div>
                </div>
              </div>
              
              <div className="health-card">
                <div className="health-icon">
                  <FaBed />
                </div>
                <div className="health-data">
                  <h3>Sleep</h3>
                  <div className="health-value">{healthData.sleep[healthData.sleep.length - 1]?.value} hrs</div>
                  <div className="health-label">Last Night</div>
                </div>
              </div>
              
              <div className="health-card">
                <div className="health-icon">
                  <FaWeight />
                </div>
                <div className="health-data">
                  <h3>Weight</h3>
                  <div className="health-value">{healthData.weight[healthData.weight.length - 1]?.value} lbs</div>
                  <div className="health-label">Current</div>
                </div>
              </div>
              
              <div className="health-card">
                <div className="health-icon">
                  <FaHeartbeat />
                </div>
                <div className="health-data">
                  <h3>Heart Rate</h3>
                  <div className="health-value">{healthData.heartRate[healthData.heartRate.length - 1]?.value} bpm</div>
                  <div className="health-label">Resting</div>
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Activity Overview (Last 30 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData.steps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#4A90E2" name="Steps" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="activity-tab">
            <div className="chart-container">
              <h3>Daily Step Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData.steps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#4A90E2" name="Steps" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="activity-stats">
              <div className="stat-card">
                <h3>Average Daily Steps</h3>
                <div className="stat-value">
                  {Math.floor(healthData.steps.reduce((acc, curr) => acc + curr.value, 0) / healthData.steps.length)}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Highest Step Count</h3>
                <div className="stat-value">
                  {Math.max(...healthData.steps.map(item => item.value))}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Total Steps (30 Days)</h3>
                <div className="stat-value">
                  {healthData.steps.reduce((acc, curr) => acc + curr.value, 0)}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'sleep' && (
          <div className="sleep-tab">
            <div className="chart-container">
              <h3>Sleep Duration</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData.sleep}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Hours" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="sleep-stats">
              <div className="stat-card">
                <h3>Average Sleep</h3>
                <div className="stat-value">
                  {(healthData.sleep.reduce((acc, curr) => acc + curr.value, 0) / healthData.sleep.length).toFixed(1)} hrs
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Best Sleep</h3>
                <div className="stat-value">
                  {Math.max(...healthData.sleep.map(item => item.value))} hrs
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Sleep Quality</h3>
                <div className="stat-value">Good</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'weight' && (
          <div className="weight-tab">
            <div className="chart-container">
              <h3>Weight Tracking</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData.weight}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Weight (lbs)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="weight-stats">
              <div className="stat-card">
                <h3>Current Weight</h3>
                <div className="stat-value">
                  {healthData.weight[healthData.weight.length - 1]?.value} lbs
                </div>
              </div>
              
              <div className="stat-card">
                <h3>30-Day Change</h3>
                <div className="stat-value">
                  {(healthData.weight[healthData.weight.length - 1]?.value - healthData.weight[0]?.value).toFixed(1)} lbs
                </div>
              </div>
              
              <div className="stat-card">
                <h3>BMI</h3>
                <div className="stat-value">24.5</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'log' && (
          <div className="log-tab">
            <form onSubmit={handleSubmit} className="health-log-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={newEntry.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="steps">Steps</label>
                  <div className="input-with-icon">
                    <FaWalking className="input-icon" />
                    <input
                      type="number"
                      id="steps"
                      name="steps"
                      className="form-control"
                      placeholder="Number of steps"
                      value={newEntry.steps}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sleep">Sleep (hours)</label>
                  <div className="input-with-icon">
                    <FaBed className="input-icon" />
                    <input
                      type="number"
                      id="sleep"
                      name="sleep"
                      className="form-control"
                      placeholder="Hours of sleep"
                      value={newEntry.sleep}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Weight (lbs)</label>
                  <div className="input-with-icon">
                    <FaWeight className="input-icon" />
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      className="form-control"
                      placeholder="Weight in pounds"
                      value={newEntry.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="heartRate">Heart Rate (bpm)</label>
                  <div className="input-with-icon">
                    <FaHeartbeat className="input-icon" />
                    <input
                      type="number"
                      id="heartRate"
                      name="heartRate"
                      className="form-control"
                      placeholder="Resting heart rate"
                      value={newEntry.heartRate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="meals">Meals</label>
                <div className="input-with-icon">
                  <FaUtensils className="input-icon" />
                  <textarea
                    id="meals"
                    name="meals"
                    className="form-control"
                    rows="3"
                    placeholder="What did you eat today?"
                    value={newEntry.meals}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="medications">Medications</label>
                <textarea
                  id="medications"
                  name="medications"
                  className="form-control"
                  rows="3"
                  placeholder="Medications taken"
                  value={newEntry.medications}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  rows="3"
                  placeholder="Any additional notes"
                  value={newEntry.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-log-btn">Save Entry</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthLog;
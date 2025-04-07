import { useState, useEffect } from 'react';
import './MedicineTracker.css';

const MedicineTracker = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: [],
    notes: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [timeInput, setTimeInput] = useState('');

  // Load medicines from localStorage on component mount
  useEffect(() => {
    const savedMedicines = localStorage.getItem('medicines');
    if (savedMedicines) {
      setMedicines(JSON.parse(savedMedicines));
    }
  }, []);

  // Update localStorage when medicines change
  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const handleInputChange = (e) => {
    setNewMedicine({
      ...newMedicine,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTime = () => {
    if (!timeInput) return;
    
    if (!newMedicine.time.includes(timeInput)) {
      setNewMedicine({
        ...newMedicine,
        time: [...newMedicine.time, timeInput]
      });
    }
    
    setTimeInput('');
  };

  const handleRemoveTime = (timeToRemove) => {
    setNewMedicine({
      ...newMedicine,
      time: newMedicine.time.filter(time => time !== timeToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMedicine.name || !newMedicine.dosage || newMedicine.time.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    const medicineToAdd = {
      id: Date.now(),
      ...newMedicine,
      logs: []
    };
    
    setMedicines([...medicines, medicineToAdd]);
    
    // Reset form
    setNewMedicine({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: [],
      notes: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    
    setShowForm(false);
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
    }
  };

  const handleLogDose = (medicineId, timeIndex) => {
    const now = new Date();
    
    setMedicines(medicines.map(medicine => {
      if (medicine.id === medicineId) {
        const updatedLogs = [...medicine.logs];
        updatedLogs.push({
          time: medicine.time[timeIndex],
          date: now.toISOString(),
          taken: true
        });
        
        return {
          ...medicine,
          logs: updatedLogs
        };
      }
      return medicine;
    }));
  };

  const formatFrequency = (frequency) => {
    switch (frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'as_needed':
        return 'As Needed';
      default:
        return frequency;
    }
  };

  // Check if a dose was taken today
  const isDoseTakenToday = (medicine, timeIndex) => {
    const today = new Date().toDateString();
    return medicine.logs.some(log => {
      const logDate = new Date(log.date).toDateString();
      return logDate === today && log.time === medicine.time[timeIndex];
    });
  };

  return (
    <div className="medicine-tracker">
      <h2 className="feature-title">Medicine Tracker</h2>
      <p className="feature-description">
        Track medications, dosages, and schedules for your loved ones
      </p>
      
      <div className="medicine-actions">
        <button 
          className="btn-primary add-medicine-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Medication'}
        </button>
      </div>
      
      {showForm && (
        <div className="medicine-form-container">
          <form onSubmit={handleSubmit} className="medicine-form">
            <h3>Add New Medication</h3>
            
            <div className="form-group">
              <label htmlFor="name">Medication Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMedicine.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter medication name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dosage">Dosage*</label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={newMedicine.dosage}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g., 10mg, 1 tablet"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={newMedicine.frequency}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="as_needed">As Needed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Time(s)*</label>
              <div className="time-input-container">
                <input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="form-control"
                />
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleAddTime}
                >
                  Add
                </button>
              </div>
              
              {newMedicine.time.length > 0 && (
                <div className="time-tags">
                  {newMedicine.time.map((time, index) => (
                    <span key={index} className="time-tag">
                      {time}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTime(time)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newMedicine.startDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date (Optional)</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newMedicine.endDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={newMedicine.notes}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Add any special instructions or notes"
                rows="3"
              />
            </div>
            
            <button type="submit" className="btn-primary">
              Add Medication
            </button>
          </form>
        </div>
      )}
      
      {medicines.length === 0 ? (
        <div className="no-medicines">
          <p>No medications added yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="medicine-list">
          {medicines.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              <div className="medicine-header">
                <div>
                  <h3 className="medicine-name">{medicine.name}</h3>
                  <p className="medicine-dosage">{medicine.dosage}</p>
                  <p className="medicine-frequency">{formatFrequency(medicine.frequency)}</p>
                </div>
              </div>
              
              <div className="medicine-dates">
                <strong>Start:</strong> {new Date(medicine.startDate).toLocaleDateString()}
                {medicine.endDate && (
                  <span> | <strong>End:</strong> {new Date(medicine.endDate).toLocaleDateString()}</span>
                )}
              </div>
              
              {medicine.notes && (
                <div className="medicine-notes">
                  <strong>Notes:</strong> {medicine.notes}
                </div>
              )}
              
              <div className="medicine-schedule">
                <h4 className="schedule-title">Today's Schedule</h4>
                <div className="schedule-times">
                  {medicine.time.map((time, index) => {
                    const taken = isDoseTakenToday(medicine, index);
                    return (
                      <div key={index} className={`schedule-time ${taken ? 'taken' : ''}`}>
                        {time}
                        {!taken && (
                          <button
                            className="take-button"
                            onClick={() => handleLogDose(medicine.id, index)}
                          >
                            Take
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="medicine-actions">
                <button
                  className="delete-medicine"
                  onClick={() => handleDeleteMedicine(medicine.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineTracker;
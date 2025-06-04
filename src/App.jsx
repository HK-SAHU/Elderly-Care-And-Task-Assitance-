import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/pages/Dashboard';
import TaskScheduler from './components/features/TaskScheduler';
import MedicineTracker from './components/features/MedicineTracker';
import GroceryOrdering from './components/features/GroceryOrdering';
import EmergencySOS from './components/features/EmergencySOS';
import VolunteerMatching from './components/features/VolunteerMatching';
import Chat from './components/features/Chat';
import HealthLog from './components/features/HealthLog';
import Forum from './components/features/Forum';
// Import new components
import VoiceTaskInput from './components/features/VoiceTaskInput';
import LocationCheckIn from './components/features/LocationCheckIn';
import VolunteerRating from './components/features/VolunteerRating';
import './styles/global.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard isAuthenticated={isAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <TaskScheduler />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/medicine" 
              element={
                <ProtectedRoute>
                  <MedicineTracker />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/grocery" 
              element={
                <ProtectedRoute>
                  <GroceryOrdering />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/emergency" 
              element={
                <ProtectedRoute>
                  <EmergencySOS />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteers" 
              element={
                <ProtectedRoute>
                  <VolunteerMatching />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/health" 
              element={
                <ProtectedRoute>
                  <HealthLog />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forum" 
              element={
                <ProtectedRoute>
                  <Forum />
                </ProtectedRoute>
              } 
            />
            {/* New routes for additional features */}
            <Route 
              path="/voice-tasks" 
              element={
                <ProtectedRoute>
                  <VoiceTaskInput />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/location-check-in" 
              element={
                <ProtectedRoute>
                  <LocationCheckIn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteer-ratings" 
              element={
                <ProtectedRoute>
                  <VolunteerRating />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

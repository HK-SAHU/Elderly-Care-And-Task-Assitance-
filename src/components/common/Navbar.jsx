import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  
  useEffect(() => {
    // Get the user's name from localStorage or your authentication system
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Also remove userName on logout
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link className="navbar-brand" to="/">
          ElderCare
        </Link>
        
        {isAuthenticated ? (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicine">Medicine</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grocery">Grocery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/emergency">Emergency</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/volunteers">Volunteers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chat">Chat</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/voice-tasks">Voice Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/location-check-in">Location</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/volunteer-ratings">Ratings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">Health</Link>
              </li>
            </ul>
            
            <ul className="navbar-nav auth-nav">
              <li className="nav-item">
                <span className="nav-link">Hello, {userName}</span>
              </li>
              <li className="nav-item">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </>
        ) : (
          <ul className="navbar-nav auth-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn-primary" to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

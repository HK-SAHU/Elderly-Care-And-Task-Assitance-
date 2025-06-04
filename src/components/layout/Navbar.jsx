import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      isAuthenticated: !!token,
      user: token ? user : null
    };
  });

  useEffect(() => {
    const handleAuth = (event) => {
      setAuthState(event.detail);
    };
    window.addEventListener('auth', handleAuth);
    return () => window.removeEventListener('auth', handleAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ isAuthenticated: false, user: null });
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">ElderCare</Link>
      
      <div className="nav-links">
        {authState.isAuthenticated && (
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/medicine">Medicine</Link>
            <Link to="/grocery">Grocery</Link>
            <Link to="/emergency">Emergency</Link>
            <Link to="/volunteers">Volunteers</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/voice-tasks">Voice Tasks</Link>
            <Link to="/location">Location</Link>
            <Link to="/ratings">Ratings</Link>
            <Link to="/health">Health</Link>
          </>
        )}
      </div>

      <div className="nav-auth">
        {authState.isAuthenticated ? (
          <>
            <span className="user-greeting">Hello, {authState.user?.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
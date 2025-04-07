import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user's first name from localStorage
  const getUserFirstName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      // Extract first name from full name
      return user.name.split(' ')[0];
    }
    return 'User'; // Default fallback
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
    setIsOpen(false);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">ElderCare</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/tasks" className="nav-link" onClick={() => setIsOpen(false)}>
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/medicine" className="nav-link" onClick={() => setIsOpen(false)}>
                  Medicine
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/grocery" className="nav-link" onClick={() => setIsOpen(false)}>
                  Grocery
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/emergency" className="nav-link" onClick={() => setIsOpen(false)}>
                  Emergency
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/volunteers" className="nav-link" onClick={() => setIsOpen(false)}>
                  Volunteers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chat" className="nav-link" onClick={() => setIsOpen(false)}>
                  Chat
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/health" className="nav-link" onClick={() => setIsOpen(false)}>
                  Health Log
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/forum" className="nav-link" onClick={() => setIsOpen(false)}>
                  Forum
                </Link>
              </li>
            </>
          )}
          
          {isAuthenticated ? (
            <>
              <li className="nav-item user-info">
                <span className="user-greeting">
                  <FaUser className="user-icon" />
                  Hello, {getUserFirstName()}
                </span>
              </li>
              <li className="nav-item">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link login-btn" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link signup-btn" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

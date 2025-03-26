import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import { ReactComponent as Dark } from '../../assets/dark.svg';
import { ReactComponent as Light } from '../../assets/light.svg';
import './Navbar.css';
import { environments } from '../../environments/environments';

const Navbar = ({ isDarkMode, toggleTheme, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [displayedUsername, setDisplayedUsername] = useState('');
  const [showCursor, setShowCursor] = useState(true); // Cursor visibility state

  const fetchHistory = async () => {
    try {
      const response = await fetch(environments.apiUrl + '/api/history/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchHistory();
    }
  }, [isLoggedIn]);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  // Typewriter effect for username
  useEffect(() => {
    if (user) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= user?.name?.length) {
          setDisplayedUsername(user.name.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor(false); // Hide cursor after typing is complete
        }
      }, 100); // Adjust the speed (milliseconds per letter)
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [user]);

  return (
    <div className="navbar-container">
      <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="navbar-left">
          <h1>JSON to TS</h1>
          <div className="menu-items">
            <button className="menu-icon-dark" onClick={toggleTheme}>
              {isDarkMode ? <Dark /> : <Light />}
            </button>
            <button className="menu-icon" onClick={handleMenuClick}>
              <MenuIcon />
            </button>
          </div>
        </div>
        <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/signup')}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
      <div className="user">
        <p>
          Hi,{' '}
          <span className="username">
            {user ? displayedUsername : 'user'}
            {showCursor && <span className="cursor">|</span>}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
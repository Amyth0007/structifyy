import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import './Signup.css';
import { environments } from '../../environments/environments';
import { toast } from 'react-toastify';
const Signup = ({ isDarkMode, onSignup }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async ({ username, email, password }) => {
    try {
      console.log(username, email, password);
      
      const response = await fetch(`${environments.apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, email: email, password }),
      });
      const data = await response.json();
      if (data.message) {
         toast.success('Account created Succesfully.', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: isDarkMode ? 'dark' : 'light',
                });
        onSignup();
        navigate('/login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <div className={`auth-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <AuthForm onSubmit={handleSignup} buttonText="Sign Up" isDarkMode={isDarkMode} />
      <p>
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
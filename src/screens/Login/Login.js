import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import './Login.css';
import { environments } from '../../environments/environments';
import { toast } from 'react-toastify';
const Login = ({ isDarkMode, onLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch(`${environments.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        toast.success('Login Succesfull.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: isDarkMode ? 'dark' : 'light',
        });
        onLogin();
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  return (
    <div className={`auth-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <AuthForm onSubmit={handleLogin} buttonText="Login" isDarkMode={isDarkMode} />
      <p>
        Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
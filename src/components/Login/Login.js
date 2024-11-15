import React, { useState } from 'react';
import './Login.styled.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to set a cookie with an expiration date
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error messages

    try {
      const response = await fetch('http://localhost:5000/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.user);
        alert('Login successful!');

        // Store the username in a cookie for 7 days
        setCookie('username', data.user.username, 7);

        // Redirect to home page after successful login
        window.location.href = '/';
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img src="./Pixify.png" alt="Pixify Logo" className="logo" />
        <h2 className="header">Login</h2>
        
        {/* Display error message if it exists */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

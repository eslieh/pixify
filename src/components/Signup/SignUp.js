import React, { useState } from 'react';
import './Signup.styled.js'; // Importing the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to set a cookie (just like in login)
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = {
      username: username,
      fullName: fullName,
      password: password,
      profileUrl: profileUrl,
    };

    try {
      // Send a POST request using fetch
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Account created successfully!');
        setError('');
        
        // Optionally, set the username in a cookie for 7 days
        setCookie('username', data.user.username, 7);
        
        // Redirect or navigate to login or home page after signup
        window.location.href = '/';
      } else {
        setError(data.message || 'An error occurred while signing up');
        setSuccess('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <div className="card">
        
        <img 
          src="./components/Sidebar/Pixify.png" 
          alt="Pixify Logo" 
          className="logo"
        />
        <h2 className="header">Sign Up</h2>
        
        {/* Show error or success messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
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
            <label htmlFor="fullName" className="label">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="profileUrl" className="label">Profile URL</label>
            <input
              type="url"
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
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
          <div className="inputGroup">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

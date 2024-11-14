import React, { useState } from 'react';
import './Login.styled.js';  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      username: username,
      password: password,
    };

    console.log('User:', user);
  };

  return (
    <div className="container">
      <div className="card">
        {/* Logo added here */}
        <img 
          src="./Pixify.png" 
          alt="Pixify Logo" 
          className="logo"
        />
        <h2 className="header">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
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
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        {/* Removed the sign-up redirect */}
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './Signup.styled.js'; // Importing the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const handleSubmit = (e) => {
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
      followers: followers,
      following: following,
    };

    console.log('User:', user);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="header">Sign Up</h2>
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
            <label htmlFor="fullName" className="label">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input"
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="followers" className="label">Followers</label>
            <input
              type="number"
              id="followers"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="following" className="label">Following</label>
            <input
              type="number"
              id="following"
              value={following}
              onChange={(e) => setFollowing(e.target.value)}
              className="input"
              min="0"
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
          <div className="inputGroup">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

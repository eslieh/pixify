import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Right } from './Rightbar.styled';

const Rightbar = () => {
  const [suggestions, setSuggestions] = useState([]);

  const getCurrentUsername = () => {
    const username = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    return username;
  };

  // Fetch user suggestions from the server
  const fetchSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users?suggestions=true&limit=4');
      if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);

      const data = await response.json();
      const currentUsername = getCurrentUsername();
      const filteredSuggestions = data.filter(user => user.username !== currentUsername);

      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Function to handle following a user
  const followUser = async (userId) => {
    const currentUsername = getCurrentUsername();

    try {
      // Fetch the current user and followed user data
      const currentUserResponse = await fetch(`http://localhost:5000/api/users?username=${currentUsername}`);
      const currentUserData = await currentUserResponse.json();

      const followedUserResponse = await fetch(`http://localhost:5000/api/users?username=${userId}`);
      const followedUserData = await followedUserResponse.json();

      // Update following and followers lists
      currentUserData.following.push(followedUserData.username);
      followedUserData.followers.push(currentUserData.username);

      // Update current user data
      const updateCurrentUserResponse = await fetch(`http://localhost:5000/api/users/${currentUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUserData),
      });

      const updateFollowedUserResponse = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(followedUserData),
      });

      // Check if both updates were successful
      if (updateCurrentUserResponse.ok && updateFollowedUserResponse.ok) {
        // Filter out the followed user from suggestions
        setSuggestions((prevSuggestions) =>
          prevSuggestions.filter((user) => user.username !== userId)
        );
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <Right>
      <h2>Suggestions</h2>
      <div className="suggestions-list">
        {suggestions.length > 0 ? (
          suggestions.map((user) => (
            <div key={user.id} className="suggestion">
              <img
                src={user.profile_url || 'https://via.placeholder.com/150'}
                alt={`${user.username}'s profile`}
                className="profile-pic"
              />
              <div className="user-details">
                <p className="username">{user.username}</p>
                <p className="full-name">{user.fullnames}</p>
              </div>
              <button
                onClick={() => followUser(user.username)}
                className="btn-follow"
              >
                Follow
              </button>
            </div>
          ))
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
    </Right>
  );
};

Rightbar.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profile_url: PropTypes.string,
      fullnames: PropTypes.string.isRequired,
    })
  ),
};

export default Rightbar;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Right } from './Rightbar.styled';

const Rightbar = ({ suggestions: initialSuggestions }) => {
  // Local state for suggestions, initialized from props
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  // Function to handle following a user
  const followUser = (userId) => {
    // Filter out the followed user from the suggestions list
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((user) => user.userId !== userId)
    );
  };

  return (
    <Right>
      <h2>Suggestions</h2>
      <div className="suggestions-list">
        {suggestions.map((user) => (
          <div key={user.id} className="suggestion">
            <img src={user.profilePic} alt={`${user.username}'s profile`} className="profile-pic" />
            <div className="user-details">
              <p className="username">{user.username}</p>
              <p className="full-name">{user.fullName}</p>
              <p className="following-count">{user.followingCount} followers</p>
            </div>
            <button onClick={() => followUser(user.userId)} className="btn-follow">
              Follow
            </button>
          </div>
        ))}
      </div>
    </Right>
  );
};

Rightbar.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      followingCount: PropTypes.number.isRequired,
    })
  ),
};

Rightbar.defaultProps = {
  suggestions: [],
};
export default Rightbar;
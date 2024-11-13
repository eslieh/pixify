import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchWrapper } from './Search.styled';

const Search = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Handle input change and set the search query
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle search button click
  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filtered);
  };

  return (
    <SearchWrapper>
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {/* Display the list of filtered users */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-item">
            <img src={user.profileImage} alt="Profile" className="user-profile-image" />
            <div className="user-info">
              <span className="username">{user.username}</span>
              <span className="full-name">{user.fullName}</span>
            </div>
          </div>
        ))}
      </div>
    </SearchWrapper>
  );
};

Search.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    })
  ).isRequired,
};

export default Search;

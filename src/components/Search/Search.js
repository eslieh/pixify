import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchWrapper } from './Search.styled';

const Search = ({ initialUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(initialUsers || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change and set the search query
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(initialUsers || []); // Reset to initial users if no query
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log(`Searching for: ${searchQuery}`);
      const response = await fetch(`http://localhost:5000/api/users?username=${searchQuery}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      // Ensure that the fetched data is an array
      const usersArray = Array.isArray(data) ? data : [data];
      setFilteredUsers(usersArray);
    } catch (error) {
      setError('Error fetching users.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial users if provided
  useEffect(() => {
    if (initialUsers) {
      setFilteredUsers(initialUsers);
    }
  }, [initialUsers]);

  return (
    <SearchWrapper>
      <input
        type="text"
        placeholder="Search username"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display the list of filtered users */}
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-item">
              <img
                src={user.profile_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="user-profile-image"
              />
              <div className="user-info">
                <span className="username">{user.username}</span>
                <span className="full-name">{user.fullnames}</span>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No users found.</p>
        )}
      </div>
    </SearchWrapper>
  );
};

Search.propTypes = {
  initialUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      fullnames: PropTypes.string.isRequired,
      profile_url: PropTypes.string,
    })
  ),
};

export default Search;

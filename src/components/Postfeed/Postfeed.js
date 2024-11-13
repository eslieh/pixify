import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PostfeedWrapper } from './Postfeed.styled';

const Postfeed = ({ posts }) => {
  // State to hold the posts
  const [postList, setPostList] = useState(posts);

  // State to handle form inputs for new post
  const [newPost, setNewPost] = useState({
    userId: '',
    profileImage: '',
    username: '',
    fullName: '',
    imageUrl: '',
    caption: '',
    likeCount: 0,
    commentCount: 0,
  });

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Handle post form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.userId && newPost.imageUrl && newPost.caption) {
      // Add new post to the list
      setPostList((prevList) => [
        ...prevList,
        { ...newPost, id: String(Date.now()) }, // Unique ID
      ]);
      // Clear form after submission
      setNewPost({ userId: '', profileImage: '', username: '', fullName: '', imageUrl: '', caption: '', likeCount: 0, commentCount: 0 });
    } else {
      alert('Please fill in all the fields');
    }
  };

  // Handle like button click
  const handleLikeClick = (postId) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  };

  return (
    <PostfeedWrapper>
      <h1>Feeds</h1>

      {/* Form for creating new post */}
      <form onSubmit={handlePostSubmit} className="post-form">
        <div className="form-group">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={newPost.userId}
            onChange={handleInputChange}
            className="input-user-id"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={newPost.profileImage}
            onChange={handleInputChange}
            className="input-profile-image"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newPost.username}
            onChange={handleInputChange}
            className="input-username"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={newPost.fullName}
            onChange={handleInputChange}
            className="input-full-name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newPost.imageUrl}
            onChange={handleInputChange}
            className="input-image-url"
          />
        </div>
        <div className="form-group">
          <textarea
            name="caption"
            placeholder="Caption"
            value={newPost.caption}
            onChange={handleInputChange}
            className="textarea-caption"
          />
        </div>
        <button type="submit" className="btn-submit">Create Post</button>
      </form>

      {/* Display list of posts */}
      {postList.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img src={post.profileImage} alt="Profile" className="profile-image" />
            <div className="user-details">
              <span className="username">{post.username}</span>
              <span className="full-name">{post.fullName}</span>
            </div>
          </div>
          <p className="caption">{post.caption}</p>
          <img src={post.imageUrl} alt="Post" className="post-image" />
          <div className="post-stats">
            <span className="likes">Likes: {post.likeCount}</span>
            <span className="comments">Comments: {post.commentCount}</span>
          </div>
          <button onClick={() => handleLikeClick(post.id)} className="btn-like">
            Like
          </button>
        </div>
      ))}
    </PostfeedWrapper>
  );
};

Postfeed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      username: PropTypes.string,
      fullName: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      likeCount: PropTypes.number,
      commentCount: PropTypes.number,
    })
  ).isRequired,
};

Postfeed.defaultProps = {
  posts: [
    {
      id: '1',
      userId: 'user123',
      profileImage: 'https://via.placeholder.com/50',
      username: 'user123',
      fullName: 'John Doe',
      imageUrl: 'https://via.placeholder.com/150',
      caption: 'This is a placeholder post.',
      likeCount: 0,
      commentCount: 0,
    },
  ],
};

export default Postfeed;

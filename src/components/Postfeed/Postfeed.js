import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PostfeedWrapper } from './Postfeed.styled';

const Postfeed = ({ posts }) => {
  // State to hold the posts
  const [postList, setPostList] = useState(posts);
  
  // State to handle form inputs for new post
  const [newPost, setNewPost] = useState({
    userId: '',
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
        { ...newPost, id: String(prevList.length + 1) }, // Ensure unique ID
      ]);
      // Clear form after submission
      setNewPost({ userId: '', imageUrl: '', caption: '', likeCount: 0, commentCount: 0 });
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <PostfeedWrapper>
      {/* Form for creating new post */}
      <form onSubmit={handlePostSubmit}>
        <div>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={newPost.userId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newPost.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="caption"
            placeholder="Caption"
            value={newPost.caption}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      {/* Display list of posts */}
      {postList.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <span className="user-id">{post.userId}</span>
          </div>
          <img src={post.imageUrl} alt="Post" className="post-image" />
          <p className="caption">{post.caption}</p>
          <div className="post-stats">
            <span className="likes">Likes: {post.likeCount}</span>
            <span className="comments">Comments: {post.commentCount}</span>
          </div>
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
      imageUrl: 'https://via.placeholder.com/150',
      caption: 'This is a placeholder post.',
      likeCount: 0,
      commentCount: 0,
    },
  ],
};

export default Postfeed;

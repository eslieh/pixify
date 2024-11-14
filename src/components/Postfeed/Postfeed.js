import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PostfeedWrapper } from './Postfeed.styled';

const Postfeed = ({ posts }) => {
  const [postList, setPostList] = useState(posts || []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.userId && newPost.imageUrl && newPost.caption) {
      setPostList((prevList) => [
        ...prevList,
        { ...newPost, id: String(Date.now()), comments: [] },
      ]);
      setNewPost({ userId: '', profileImage: '', username: '', fullName: '', imageUrl: '', caption: '', likeCount: 0, commentCount: 0 });
    } else {
      alert('Please fill in all the fields');
    }
  };

  const handleLikeClick = (postId) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  };

  const handleAddComment = (postId, commentText) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), { id: String(Date.now()), text: commentText }],
            }
          : post
      )
    );
  };

  const handleEditComment = (postId, commentId, newText) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId

    ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, text: newText } : comment
              ),
            }
          : post
      )
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      )
    );
  };

  return (
    <PostfeedWrapper>
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
            className="input-fullname"
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
            <span className="comments">Comments: {post.comments.length}</span>
          </div>
          <button onClick={() => handleLikeClick(post.id)} className="btn-like">Like</button>

          {/* Comment section */}
          <div className="comment-section">
            <input
              type="text"
              placeholder="Add a comment..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddComment(post.id, e.target.value.trim());
                  e.target.value = ''; // Clear input
                }
              }}
            />
            <ul className="comment-list">
              {(post.comments || []).map((comment) => (
                <li key={comment.id} className="comment-item">
                  <span>{comment.text}</span>
                  <button onClick={() => handleEditComment(post.id, comment.id, comment.text)}>Edit</button>
                  <button onClick={() => handleDeleteComment(post.id, comment.id)}>Delete</button>
                </li>
              ))}
            </ul>
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
      profileImage: PropTypes.string,
      username: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      likeCount: PropTypes.number,
      commentCount: PropTypes.number,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

Postfeed.defaultProps = {
  posts: [
    {
      id: '1',
      userId: 'user123',
      profileImage: 'https://i.pinimg.com/280x280_RS/c8/37/58/c837582c45eed0dcf2b12dee2952e8de.jpg',
      username: 'user123',
      fullName: 'John Doe',
      imageUrl: 'https://i.pinimg.com/736x/1e/6b/29/1e6b29b276061703902ce36e1310cfc2.jpg',
      caption: 'This is a placeholder post.',
      likeCount: 0,
      commentCount: 0,
      comments: [],
    },
  ],
};

export default Postfeed;

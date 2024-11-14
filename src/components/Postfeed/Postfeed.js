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
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.userId && newPost.username && newPost.fullName && newPost.imageUrl && newPost.caption) {
      setPostList((prevList) => [
        ...prevList,
        { ...newPost, id: String(Date.now()), comments: [] },
      ]);
      setNewPost({
        userId: '',
        profileImage: '',
        username: '',
        fullName: '',
        imageUrl: '',
        caption: '',
        likeCount: 0,
        commentCount: 0,
      });
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
              comments: [
                ...(post.comments || []),
                { id: String(Date.now()), text: commentText },
              ],
            }
          : post
      )
    );
  };

  const handleEditComment = (postId, commentId) => {
    const post = postList.find((p) => p.id === postId);
    const comment = post.comments.find((c) => c.id === commentId);
    setEditingComment({ postId, commentId });
    setEditedText(comment.text);
  };

  const handleSaveComment = (postId, commentId) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, text: editedText } : comment
              ),
            }
          : post
      )
    );
    setEditingComment(null);
    setEditedText('');
  };

  const handleDeleteComment = (postId, commentId) => {
    setPostList((prevList) =>
      prevList.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
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
              className="input-comment"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddComment(post.id, e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
            <ul className="comment-list">
              {post.comments.map((comment) => (
                <li key={comment.id} className="comment-item">
                  {editingComment?.commentId === comment.id ? (
                    <>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="input-edit-comment"
                      />
                      <button onClick={() => handleSaveComment(post.id, comment.id)} className="btn-save">Save</button>
                    </>
                  ) : (
                    <>
                      <span className="comment-text">{comment.text}</span>
                      <button onClick={() => handleEditComment(post.id, comment.id)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDeleteComment(post.id, comment.id)} className="btn-delete">Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </PostfeedWrapper>
  );
};
export default Postfeed;
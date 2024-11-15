  import React, { useState, useEffect } from 'react';
  import PropTypes, { func } from 'prop-types';
  import { PostfeedWrapper } from './Postfeed.styled';

  // Function to get the current user's details from cookies
  const getUserFromCookies = () => {
    const username = document.cookie
      .split('; ')
      .find((row) => row.startsWith('username='))
      ?.split('=')[1];

    return username ? { username } : null;
  };
  const username = document.cookie
  .split('; ')
  .find((row) => row.startsWith('username='))
  ?.split('=')[1];
  let userData = null; // Global variable to store the fetched user data

  // Function to fetch user data from the server
  async function getUserData(username) {
    try {
      const response = await fetch(`http://localhost:5000/api/users?username=${username}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      userData = await response.json(); // Assign the fetched data to the global variable
      console.log('User data fetched:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      userData = null; // Set to null if there's an error
    }
  }
  
  // Fetch user data and store it in the global variable
  async function initializeUserData(username) {
    await getUserData(username);
  }
  
  // Call the function to fetch and store the user data
  initializeUserData(username);
  
  const Postfeed = () => {
    const [postList, setPostList] = useState([]);
    const [newPost, setNewPost] = useState({ caption: '', imageUrl: '' });
    const [editingComment, setEditingComment] = useState(null);
    const [editedText, setEditedText] = useState('');
    const user = getUserFromCookies();

    useEffect(() => {
      fetchPosts();
    }, []);

    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
    
        // Check if the response is an array
        if (Array.isArray(data)) {
          setPostList(data);
        } else {
          console.error('Data fetched is not an array:', data);
          setPostList([]); // Fallback to an empty array if data is not an array
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPostList([]); // Fallback to an empty array on error
      }
    };

    // Handle creating a new post
    const handlePostSubmit = async (e) => {
      e.preventDefault();
      if (newPost.caption && newPost.imageUrl) {
        const newPostData = {
          ...newPost,
          username: user?.username,
          fullnames: userData.fullnames,
          profileImage: userData.profile_url, // Replace with actual profile image fetched from user data
          likeCount: 0,
          commentCount: 0,
          comments: [],
        };
        console.log(newPostData)
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPostData),
          
        });
        if (response.ok) {
          const createdPost = await response.json();
          setPostList((prevList) => [...prevList, createdPost]);
          setNewPost({ caption: '', imageUrl: '' });
        }
      }
    };

    // Handle liking a post
    const handleLikeClick = async (postId) => {
      const post = postList.find((p) => p.id === postId);
      const updatedPost = { ...post, likeCount: post.likeCount + 1 };

      await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likeCount: updatedPost.likeCount }),
      });

      setPostList((prevList) =>
        prevList.map((p) => (p.id === postId ? updatedPost : p))
      );
    };

    // Handle adding a comment
    const handleAddComment = async (postId, commentText) => {
      const post = postList.find((p) => p.id === postId);
      const newComment = { id: String(Date.now()), text: commentText };
      const updatedPost = { ...post, comments: [...post.comments, newComment] };

      await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: updatedPost.comments }),
      });

      setPostList((prevList) =>       
        prevList.map((p) => (p.id === postId ? updatedPost : p))
      );
    };

    // Handle editing a comment
    const handleEditComment = (postId, commentId) => {
      const post = postList.find((p) => p.id === postId);
      const comment = post.comments.find((c) => c.id === commentId);
      setEditingComment({ postId, commentId });
      setEditedText(comment.text);
    };

    const handleSaveComment = async (postId, commentId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: editedText }),
        });
    
        if (response.ok) {
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
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    };
    

    return (
      <PostfeedWrapper>
        {/* Form for creating a new post */}
        <form onSubmit={handlePostSubmit} className="post-form">
          <div className="form-group">
            <textarea
              name="caption"
              placeholder="Caption"
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
              className="textarea-caption"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={newPost.imageUrl}
              onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
              className="input-image-url"
            />
          </div>
          <button type="submit" className="btn-submit">Create Post</button>
        </form>

        {/* Display list of posts */}
        {postList.map((post) => (
          <div key={post.id} className="post">
            <div className='userdata'>
            <img src={post.profileImage} alt="Profile" className="profile-image" />
            <div className='nam-container'>
            <span className="username">{post.username}</span>
            <span className="fullnames">{post.fullnames}</span>
            </div>
            </div>
            <p className="caption">{post.caption}</p>
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <span className="likes">Likes: {post.likeCount}</span>
            <button onClick={() => handleLikeClick(post.id)} className="btn-like">Like</button>
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

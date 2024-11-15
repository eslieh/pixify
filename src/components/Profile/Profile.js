import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const [editableUser, setEditableUser] = useState({});
   const navigate = useNavigate();

   // Fetch the current user's profile
   useEffect(() => {
      const userId = Cookies.get("username");
      if (userId) {
         fetch(`http://localhost:5000/api/users?username=${userId}`)
            .then(response => response.json())
            .then(data => {
               setUser(data);
               setEditableUser(data);
            })
            .catch(error => console.error("Error fetching user data:", error));
      }
   }, []);

   const handleEditToggle = () => {
      setIsEditing(!isEditing);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditableUser({ ...editableUser, [name]: value });
   };

   const handleSave = async () => {
      try {
         const response = await fetch(`http://localhost:5000/api/users/${user.username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editableUser),
         });

         if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditableUser(updatedUser);
            setIsEditing(false);
            console.log("Profile updated successfully");
         } else {
            console.error("Failed to update profile");
         }
      } catch (error) {
         console.error("Error saving profile:", error);
      }
   };

   const handleLogout = () => {
      Cookies.remove("username");
      navigate("/auth");
   };

   const followersCount = Array.isArray(user.followers) ? user.followers.length : 0;
   const followingCount = Array.isArray(user.following) ? user.following.length : 0;

   return (
      <div className="profile-container">
         <div className="profile-header">
            {isEditing ? (
               <input
                  type="text"
                  name="profile_url"
                  value={editableUser.profile_url}
                  onChange={handleInputChange}
                  placeholder="Profile Picture URL"
               />
            ) : (
               <img
                  src={user.profile_url || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="profile-pic"
               />
            )}

            {isEditing ? (
               <input
                  type="text"
                  name="fullnames"
                  value={editableUser.fullnames}
                  onChange={handleInputChange}
               />
            ) : (
               <h2>{user.fullnames}</h2>
            )}
            <p>{user.username}</p>
         </div>

         <div className="bio-section">
            <div className="followers">
               <strong>{followersCount}</strong> Followers
            </div>
            <div className="following">
               <strong>{followingCount}</strong> Following
            </div>
         </div>

         {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
               Save
            </button>
         ) : (
            <button className="edit-btn" onClick={handleEditToggle}>
               Edit Profile
            </button>
         )}

         <button className="logout-btn" onClick={handleLogout}>
            Logout
         </button>
      </div>
   );
};

export default Profile;

import React, { useState } from "react";
import "./Profile.styled.js";

const Profile = () => {
   const [user, setUser] = useState({
      profilePic: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      followers: 0,
      following: 0,
   });

   const [isEditing, setIsEditing] = useState(false);
   const [editableUser, setEditableUser] = useState({ ...user });

   const handleEditToggle = () => {
      setIsEditing(!isEditing);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditableUser({ ...editableUser, [name]: value });
   };

   const handleSave = () => {
      setUser({ ...editableUser });
      setIsEditing(false);
   };

   return (
      <div className="profile-container">
         <div className="profile-header">
            {isEditing ? (
               <input
                  type="text"
                  name="profilePic"
                  value={editableUser.profilePic}
                  onChange={handleInputChange}
                  placeholder="Profile Picture URL"
               />
            ) : (
               <img
                  src={user.profilePic}
                  alt="Profile"
                  className="profile-pic"
               />
            )}

            {isEditing ? (
               <input
                  type="text"
                  name="name"
                  value={editableUser.name}
                  onChange={handleInputChange}
               />
            ) : (
               <h2>{user.name}</h2>
            )}
            <p>{user.email}</p>
         </div>

         <div className="bio-section">
            <div className="followers">
               <strong>{user.followers}</strong> Followers
            </div>
            <div className="following">
               <strong>{user.following}</strong> Following
            </div>
         </div>

         {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
         ) : (
            <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
         )}

         <button className="logout-btn" onClick={() => console.log("Logged out!")}>Logout</button>
      </div>
   );
};

export default Profile;

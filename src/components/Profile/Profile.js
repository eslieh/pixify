import React from "react";
import "./Profile.styled.js";

const Profile = () => {
   const user = {
      profilepic: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      followers: 0,
      following: 0,
   };

   const handleLogout = () => {
      console.log("Logged out!");
   };

   return (
      <div className="profile-container">
         <div className="profile-header">
            <img
               src={user.profilePic}
               alt="Profile"
               className="profile-pic"
               />
               <h2>{user.name}</h2>
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

         <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
   );
};

export default Profile;
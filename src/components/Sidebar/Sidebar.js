import React from "react";

import PropTypes from "prop-types";
import { SidebarWrapper } from "./Sidebar.styled";
import { NavLink } from "react-router-dom";
import logo from './Pixify.png'
function Sidebar() {
  return (
    <SidebarWrapper className="sidebar">
      <div className="nav-container">
        <div className="logo-container">
          <img src={logo} alt="logo" className="profile_image" />
        </div>
        <div className="navigators">
          <NavLink to={"/"} className="nav-link">
            Home
          </NavLink>
          <NavLink to={"/Search"} className="nav-link">
            Search
          </NavLink>
          <NavLink to={"/Myprofile"} className="nav-link">
            My Profile
          </NavLink>
        </div>
      </div>
    </SidebarWrapper>
  );
}

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;

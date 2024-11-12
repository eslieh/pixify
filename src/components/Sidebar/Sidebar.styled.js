import styled from "styled-components";

export const SidebarWrapper = styled.div`
  width: 250px; /* Sidebar width */
  height: 100vh; /* Full viewport height */
  background-color: #333; /* Dark background color */
  color: white; /* Text color */
  padding: 20px; /* Inner padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Shadow effect */

  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo-container {
    margin-bottom: 20px;
    text-align: center;

    .profile_image {
      width: 80px;
      height: auto;
      border-radius: 50%; /* Make the logo circular if desired */
    }
  }

  .navigators {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .nav-link {
    color: #ddd; /* Light text color */
    text-decoration: none;
    margin: 10px 0; /* Spacing between links */
    font-size: 16px;
    padding: 8px 15px;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    transition: background 0.3s;

    &:hover {
      background-color: #444; /* Darker background on hover */
      color: #fff; /* Text color on hover */
    }

    &.active {
      background-color: #555; /* Highlight active link */
      color: #fff;
    }
  }
`;

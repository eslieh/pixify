import styled from "styled-components";

export const SidebarWrapper = styled.div`
width: 25%;
    height: 84vh;
    background-color: #33333300;
    color: #000000;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: none;

  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: c
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 347 bytes | 347.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To github.com:eslieh/pixify.gitenter;
  }

  .logo-container {
    margin-bottom: 20px;
    text-align: center;

    .profile_image {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }
  }

  .navigators {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .nav-link {
       color: black;
    text-decoration: none;
    margin: 2px 0;
    font-size: 16px;
    padding: 8px 15px;
    width: 100%;
    text-align: start;
    border-radius: 8px;
    transition: background 0.3s;

    &:hover {
      background-color: #444; /* Darker background on hover */
      color: #fff; /* Text color on hover */
    }

    &.active {
      background-color: black; /* Highlight active link */
      color: #fff;
    }
  }
`;

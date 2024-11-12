import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Errorpage from './pages/Errorpage.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <Errorpage/>
  },
  {
    path: "/Auth",
    element: <Auth/>,
    errorElement: <Errorpage/>
  },
  {
    path: "/Profile",
    element: <Profile/>,
    errorElement: <Errorpage/>
  },
  {
    path: "/Search",
    element: <Search/>,
    errorElement: <Errorpage/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

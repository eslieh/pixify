import React, { useState } from 'react';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/SignUp';
import './Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`tab-button ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`tab-button ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      <div className="auth-form">
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default Auth;

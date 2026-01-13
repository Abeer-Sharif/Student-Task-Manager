import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitchToSignup = (e) => {
    e.preventDefault();
    setIsSignup(true);
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    setIsSignup(false);
  };

  return (
    <div className="app">
      {isSignup ? (
        <SignupForm
          onSignup={onLogin}
          onSwitchToLogin={handleSwitchToLogin}
        />
      ) : (
        <LoginForm
          onLogin={onLogin}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}
    </div>
  );
};

export default Login;

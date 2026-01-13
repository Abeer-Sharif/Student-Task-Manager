import React from 'react';

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">Student Task Manager</h1>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

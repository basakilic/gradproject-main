import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './logo.jpg';

function Header({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        window.history.pushState(null, null, window.location.pathname);
      }
    });
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/adminhomepage" className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>


      <div className="profile-cart-container">
        <Link to="/gelenistekler" className="header-profile-link">
          Requests
        </Link>
        <Link to="/onaylananistekler" className="header-cart-link">
          Accepted
        </Link>
        <span className="header-logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </header>
  );
}

export default Header;

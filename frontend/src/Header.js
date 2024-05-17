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
        <Link to="/homepage" className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <div className="profile-cart-container">
        <Link to="/homepage" className="header-cart-link">
          Homepage
        </Link>
        <Link to="/profile" className="header-profile-link">
          Profile
        </Link>
        <Link to="/cart" className="header-cart-link">
          Cart
        </Link>
        <span className="header-logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </header>
  );
}

export default Header;

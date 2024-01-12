import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';
import logo from './logo.png';

function Navbar() {
  const navigate = useNavigate();
  useEffect(() => {
    // Any other initialization logic you may need
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const username = localStorage.getItem('username');
  const userType = localStorage.getItem('memberstatus');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    localStorage.removeItem('memberstatus');
    navigate('/', { replace: true });
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        window.history.pushState(null, null, window.location.pathname);
      }
    });
  };

  const renderSearchBar = () => {
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleSearch = (event) => {
      event.preventDefault();
      if (searchQuery.trim() !== '') {
        fetch(`http://localhost:8081/events?name=${searchQuery}`)
          .then(response => response.json())
          .then(data => {
            const matchedEvent = data.find(event => event.name === searchQuery);
            if (matchedEvent) {
              navigate('/searchEvents', { state: { event: matchedEvent } });
            } else {
              alert('No events match. Please try again with a different name.');
            }
          })
          .catch(error => console.error('Error fetching search results:', error));
      }
    };

    if (location.pathname === '/showevents' || location.pathname === '/searchEvents' || location.pathname === '/showpurchasedtickets') {
      return (
        <form className="form-inline" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search An Event"
              aria-label="Search"
              style={{ width: '600px' }}
              onChange={handleSearchChange}
            />
            <div style={{ width: '10px' }}></div>
            <div className="input-group-append">
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      );
    }
    return null;
  };

  const renderUserSpecificLinks = () => {
    // The same user-specific links logic
    // ...

    return null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/homepage">
        <img src={logo} alt="HugsForBugs logo" width="200" height="50" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${location.pathname === '/homepage' ? 'active' : ''}`}>
            <Link to="/homepage" className="nav-link">
              Home Page
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/showevents' ? 'active' : ''}`}>
            <Link to="/showevents" className="nav-link">
              Events
            </Link>
          </li>
          {renderUserSpecificLinks()}
        </ul>
        <div className="mx-auto">{renderSearchBar()}</div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">{username}</button>
        <div className="dropdown-content">
          <a href="/profile">Profile</a>
          <a onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

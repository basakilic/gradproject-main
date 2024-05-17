import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Include the CSS file
import logo from './logo.jpg';

function Navbar() {
  const navigate = useNavigate();
  useEffect(() => {
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
    window.addEventListener('popstate', function (workshop) {
      if (workshop.state) {
        window.history.pushState(null, null, window.location.pathname);
      }
    });
  };

  const renderSearchBar = () => {
    const handleSearchChange = (workshop) => {
      setSearchQuery(workshop.target.value);
    };

    const handleSearch = (workshop) => {
      workshop.preventDefault();
      if (searchQuery.trim() !== '') {
        fetch(`http://localhost:8081/workshops?name=${searchQuery}`)
          .then(response => response.json())
          .then(data => {
            const matchedEvent = data.find(workshop => workshop.name === searchQuery);
            if (matchedEvent) {
              navigate('/searchworkshop', { state: { workshop: matchedEvent } });
            } else {
              alert('No workshops match. Please try again with a different name.');
            }
          })
          .catch(error => console.error('Error fetching search results:', error));
      }
    };

    if (location.pathname === '/showworkshops' || location.pathname === '/searchworkshop' || location.pathname === '/showpurchasedtickets') {
      return (
        <form className="form-inline" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search An Workshop"
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
    if (username != null) {
      return (
        <li className={`nav-item dropdown ${location.pathname === '/profile' ? 'active' : ''}`}>
          <div className="dropdown welcome-dropdown">
            <button className="dropbtn">
              Welcome {username}
            </button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <></>
      )
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/homepage">
        <img src={logo} alt="FunHour logo" width="80" height="80" />
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

          {username === null &&
            <Link to="/login" style={{ position: 'absolute', top: '25px', right: '150px', textAlign: 'center' }}>
              <button className='btn btn-success'>Login</button>
            </Link>}
          <Link to="/organizedworkshops" style={{ position: 'absolute', top: '35px', right: '200px', textAlign: 'center' }}>
            <button className='btn btn-success'>Organized Workshops</button>
          </Link>
          {renderUserSpecificLinks()}
        </ul>
        <div className="mx-auto">{renderSearchBar()}</div>
      </div>
    </nav>
  );
}

export default Navbar;

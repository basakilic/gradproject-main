import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.png';

function Navbar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('http://localhost:8081/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);

      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };
  const handleBuy = (event) => {
    localStorage.setItem('eventname', event.name);
    localStorage.setItem('eventdate', event.date);
    localStorage.setItem('eventtime', event.time);
    localStorage.setItem('eventlocation', event.location);
    localStorage.setItem('eventquota', event.quota);
    navigate('/cart');

  };
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
    window.history.pushState(null, null, window.location.pathname); // Replace the current history state with the homepage URL
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
    if (userType === 'admin') {
      return (
        <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
          <Link to="/admin" className="nav-link">
            Admin Dashboard
          </Link>
        </li>
      );
    } else if (userType === 'Customer') {
      return (
        <>
          <li className={`nav-item ${location.pathname === '/member' ? 'active' : ''}`}>
            <Link to="/member" className="nav-link">
              Member Dashboard
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/showpurchasedtickets' ? 'active' : ''}`}>
            <Link to="/showpurchasedtickets" className="nav-link">
              Purchased Tickets
            </Link>
          </li>
        </>

      );
    } else if (userType === 'organizer') {
      return (
        <>
          <li className={`nav-item ${location.pathname === '/createevent' ? 'active' : ''}`}>
            <Link to="/createevent" className="nav-link">
              Create New Event
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/showorganizedevents' ? 'active' : ''}`}>
            <Link to="/showorganizedevents" className="nav-link">
              Organized Events
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/showpurchasedtickets' ? 'active' : ''}`}>
            <Link to="/showpurchasedtickets" className="nav-link">
              Purchased Tickets
            </Link>
          </li>
        </>
      );
    }

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
        <div className="mx-auto">{renderSearchBar()}
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">{username}</button>
        <div class="dropdown-content">
          <a href="/profile">Profile</a>
          <a onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

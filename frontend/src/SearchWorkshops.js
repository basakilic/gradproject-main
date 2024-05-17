import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './SearchWorkshops.css';

function SearchWorkshops() {
  const [workshop, setEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.workshop) {
      setEvent(location.state.workshop);
    }

  }, [location]);

  const handleBuy = (workshop) => {
    localStorage.setItem('workshopname', workshop.name);
    localStorage.setItem('workshopdate', workshop.date);
    localStorage.setItem('workshoptime', workshop.time);
    localStorage.setItem('workshoplocation', workshop.location);
    localStorage.setItem('workshopquota', workshop.quota);
    localStorage.setItem('workshopdescription', workshop.description);
    localStorage.setItem('workshoporganizer', workshop.organizer);

    navigate('/cart');
  };

  return (
    <div>
      <Navbar />
      <div className='workshop-container'>
        <div className='workshop-grid'>
          {workshop && (
            <div className="workshop-card">
              <h3>{workshop.name}</h3>
              <p>Date: {workshop.date}</p>
              <p>Time: {workshop.time}</p>
              <p>Location: {workshop.location}</p>
              <p>Quota of the workshop: {workshop.quota}</p>
              <button className='btn btn-success w-100 green-btn' onClick={() => handleBuy(workshop)}>Buy Ticket</button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default SearchWorkshops;
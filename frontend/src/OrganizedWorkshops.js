import React, { useEffect, useState, use } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function OrganizedWorkshops() {
  const [workshops, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const username = localStorage.getItem('username');
    if (username) {
      fetch(`http://localhost:8081/organizedworkshops?username=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
          setEvents(data);
        })
        .catch(error => {
          console.error('Error fetching workshops:', error);
        });
    } else {
      console.error('Username not found in localStorage.');
    }
  };
  const handleBuy = (workshop) => {
    localStorage.setItem('name', workshop.name);
    localStorage.setItem('date', workshop.date);
    localStorage.setItem('time', workshop.time);
    localStorage.setItem('location', workshop.location);
    localStorage.setItem('quota', workshop.quota);
    navigate('/editworkshop');

  };
  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div>
          <h1 style={{ position: 'absolute', top: 0, left: 700 }}></h1>
          <div className="event-grid">
            {workshops.map((workshop, index) => (
              <div key={index} className="event-card">
                <h3>{workshop.name}</h3>
                <p>Date: {workshop.date}</p>
                <p>Time: {workshop.time}</p>
                <p>Location: {workshop.location}</p>
                <p>Quota of the workshop: {workshop.quota}</p>
                <button className='btn btn-success w-100 green-btn' onClick={() => handleBuy(workshop)}>Edit Workshop</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizedWorkshops;
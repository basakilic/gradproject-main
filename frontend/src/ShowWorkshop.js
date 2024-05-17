import React, { useEffect, useState, use } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './ShowWorkshop.css';

function ShowWorkshop() {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/showworkshops')
      .then(res => {
        console.log(res.data)
        setWorkshops(res.data)
      })
  }, [])


  const handleBuy = (workshop) => {
    localStorage.setItem('name', workshop.name);
    localStorage.setItem('date', workshop.date);
    localStorage.setItem('time', workshop.time);
    localStorage.setItem('location', workshop.location);
    localStorage.setItem('quota', workshop.quota);
    localStorage.setItem('description', workshop.description);
    localStorage.setItem('organizer', workshop.description);

    navigate('/cart');
  };

  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center align-items-center vh-120'>
        <div>
          <h1 style={{ position: 'absolute', top: 0, left: 700 }}></h1>
          <div className="show-workshop-container">
            <div className="row">
              {workshops.map((workshop, index) => (
                <div key={index} className="col-md-4">
                  <div className="workshop-card" >
                    <h3>{workshop.name}</h3>
                    <p>Date: {workshop.date}</p>
                    <p>Time: {workshop.time}</p>
                    <p>Location: {workshop.location}</p>
                    <button className='btn btn-success w-100 green-btn' onClick={() => handleBuy(workshop)}>Buy Ticket</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ShowWorkshop;
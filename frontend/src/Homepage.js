import React from 'react';
import Navbar from './Navbar';
import './Homepage.css';
import backgroundImage from './background.jpg';

function Homepage() {
  const name = localStorage.getItem('name');
  const time = localStorage.getItem('time');
  const quota = localStorage.getItem('quota');
  const location = localStorage.getItem('location');
  const date = localStorage.getItem('date');
  const description = localStorage.getItem('description');
  const organizer = localStorage.getItem('organizer');

  return (

    <div>
      <Navbar />  { }
      <div className='d-flex justify-content-center align-items-center bg-primary vh-100' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      }}>

        <div>
          <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to FUNHOUR !
          </h1>
          <p style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '28px', fontWeight: 'lighter', fontFamily: 'sans-serif', textAlign: 'center' }}>
            ENROLL WORKSHOPS OR CREATE WORKSHOPS !
          </p>
        </div>
      </div>

    </div>

  )

}

export default Homepage
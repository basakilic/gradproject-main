import React from 'react';
import Navbar from './Navbar';
import './WorkshopDetails.css';

function WorkshopDetails() {


  const name = localStorage.getItem('name');
  const time = localStorage.getItem('time');
  const quota = localStorage.getItem('quota');
  const location = localStorage.getItem('location');
  const date = localStorage.getItem('date');
  const description = localStorage.getItem('description');
  const organizer = localStorage.getItem('organizer');


  return (
    <div>
      <Navbar />
      <body>
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">Workshop Details</h1>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h2 className="profile-section-title">Personal Information</h2>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">name:</div>
                <div className="profile-info-value">{name}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">time:</div>
                <div className="profile-info-value">{time}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">quota:</div>
                <div className="profile-info-value">{quota}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">location:</div>
                <div className="profile-info-value">{location}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">date:</div>
                <div className="profile-info-value">{date}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">description:</div>
                <div className="profile-info-value">{description}</div>
              </div>
              <div className="profile-info">
                <div className="profile-info-label profile-info-bold">organizer:</div>
                <div className="profile-info-value">{organizer}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default WorkshopDetails;
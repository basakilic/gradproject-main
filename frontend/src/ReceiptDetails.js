import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';
function ReceiptDetails() {
  const username = localStorage.getItem('username');
  const name = localStorage.getItem('name');
  const surname = localStorage.getItem('surname');
  const email = localStorage.getItem('email');
  const memberstatus = localStorage.getItem('memberstatus');
  const navigate = useNavigate();
  if (memberstatus === 'null') {
    localStorage.setItem('memberstatus', 'Guest');
  }

  const handleEditProfile = () => {
    navigate('/editprofile');
    console.log('Edit profile button clicked');
  };

  const handleSignup = () => {
    navigate('/signup');
    console.log('Sign up button clicked');
  };


  return (
    <div>
      <Navbar />
      <body>
        <div className="profile-container">
        <h1 className="profile-title">TEST</h1>


        </div>
      </body>
    </div>
  );
}

export default ReceiptDetails;
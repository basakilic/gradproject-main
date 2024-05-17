import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import validation from './CreateWorkshopValidation';
import axios from 'axios'

function CreateWorkshop() {
  const username = localStorage.getItem('username');
  const [values, setValues] = useState({
    name: "",
    time: "",
    quota: "",
    location: "",
    date: "",
    description: "",
    organizer: localStorage.getItem('username')
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleInput = (workshop) => {
    setValues(prev => ({ ...prev, [workshop.target.name]: [workshop.target.value] }))
  }
  const handleSubmit = (workshop) => {
    workshop.preventDefault();
    setErrors(validation(values));
    if (errors.name === "" &&
      errors.time === "" &&
      errors.quota === "" &&
      errors.location === "" &&
      errors.description === "" &&
      errors.date === "" &&
      errors.organizer === ""
    ) {
      axios
        .post('http://localhost:8081/createworkshop', values)
        .then(res => {
          if (res.data.fail) {
            alert("Create Workshop funtion is Unsuccesful");
          } else {
            navigate('/homepage');
          }

        })

        .catch(err => console.log(err));
    }

  }



  return (
    <div className="login-container">

      <div className="login-content">

        <h2 className="login-title"> Create Workshop</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="name"> Workshop Name</label>
            <input className="login-input" type="name" placeholder="Enter name" name="name" value={values.name} onChange={handleInput} />
            {errors.name && <span className="login-error">{errors.name}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="description">Workshop Description</label>
            <input className="login-input" type="description" placeholder="Enter description" name="description" value={values.description} onChange={handleInput} />
            {errors.description && <span className="login-error">{errors.description}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="time">Workshop Time</label>
            <input className="login-input" type="time" placeholder="Enter time" name="time" value={values.time} onChange={handleInput} />
            {errors.time && <span className="login-error">{errors.time}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="quota"> Workshop Quota</label>
            <input className="login-input" type="quota" placeholder="Enter quota" name="quota" value={values.quota} onChange={handleInput} />
            {errors.quota && <span className="login-error">{errors.quota}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="location">Workshop Location</label>
            <input className="login-input" type="location" placeholder="Enter location" name="location" value={values.location} onChange={handleInput} />
            {errors.location && <span className="login-error">{errors.location}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="date">Workshop Date</label>
            <input className="login-input" type="date" placeholder="Enter date" name="date" value={values.date} onChange={handleInput} />
            {errors.date && <span className="login-error">{errors.date}</span>}
          </div>

          <div className="login-input-group">
            <label className="login-label" htmlFor="organizer">Workshop Organizer</label>
            <input className="login-input" type="organizer" placeholder="Enter organizer" name="organizer" value={values.organizer} onChange={handleInput} readOnly />
            {errors.username && <span className="login-error">{errors.organizer}</span>}
          </div>
          <button type="submit" className="login-btn">
            Create Workshop
          </button>

        </form>
        <div className="login-options">


        </div>
      </div>
    </div>
  );
}





export default CreateWorkshop;

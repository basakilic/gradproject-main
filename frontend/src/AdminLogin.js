import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLoginValidation from './AdminLoginValidation'
import axios from 'axios'
import './AdminLogin.css';
import logo from './logo.jpg';

function AdminLogin() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }
  const handleSubmit = (event) => {

    event.preventDefault();
    const err = AdminLoginValidation({ username: values.username, password: values.password });
    setErrors(AdminLoginValidation({ username: values.username, password: values.password })); setErrors(err);
    if (errors.username === "" && errors.password === "") {
      axios.post('http://localhost:8081/adminlogin', { username: values.username, password: values.password })
        .then(res => {
          if (res.data.success) {
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('password', res.data.password);


            navigate('/adminhomepage');
          } else {
            alert("Email or Password is wrong");
          }
        })

        .catch(err => console.log(err));
    }


  }
  useEffect(() => {

    localStorage.removeItem('username');
    localStorage.removeItem('password');


  }, []);

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="login-image">
          <img src={logo} alt="Logo" className="logo-image" /></div>
        <h2 className="admin-login-title">ADMIN LOGIN</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-input-group">
            <label htmlFor="username" className="admin-login-label">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={values.username}
              onChange={handleInput}
              className="admin-login-input"
            />
            {errors.username && <span className="admin-login-error">{errors.username}</span>}
          </div>
          <div className="admin-login-input-group">
            <label htmlFor="password" className="admin-login-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="admin-login-input"
            />
            {errors.password && <span className="admin-login-error">{errors.password}</span>}
          </div>
          <button type="submit" className="admin-login-btn">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}


export default AdminLogin 
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './LoginValidation';
import axios from 'axios'
import './Login.css';
import logo from './logo.jpg';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }
  const handleSubmit = (event) => {

    event.preventDefault();
    const err = validation({ email: values.email, password: values.password });
    setErrors(validation({ email: values.email, password: values.password })); setErrors(err);
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', { email: values.email, password: values.password })
        .then(res => {
          console.log(res.data.memberstatus);
          if (res.data.success) {
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('surname', res.data.surname);
            localStorage.setItem('email', values.email);
            localStorage.setItem('memberstatus', res.data.memberstatus);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('password', res.data.password);

            navigate('/');
          } else {
            alert("Email or Password is wrong");
          }
        })

        .catch(err => console.log(err));
    }


  }
  useEffect(() => {

    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    localStorage.removeItem('memberstatus');
    localStorage.removeItem('password');
    localStorage.removeItem('id');

  }, []);

  return (


    <div className="login-container">

      <div className="login-content">
        <div className="login-image">
          <img src={logo} alt="Logo" className="logo-image" /></div>
        <h2 className="login-title"> User Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="email"> Email</label>
            <input className="login-input" type="email" placeholder="Enter Email" name="email" value={values.email} onChange={handleInput} />
            {errors.email && <span className="login-error">{errors.email}</span>}
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && <span className="login-error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <div className="login-options">
          <Link className="create-account-link" to="/signup">
            Create Account
          </Link>
          <Link className="admin-login-link" to="/adminlogin">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';
import logo from './logo.jpg';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    memberstatus: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));

    if (
      errors.name === '' &&
      errors.surname === '' &&
      errors.email === '' &&
      errors.username === '' &&
      errors.password === ''
    ) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          if (res.data.fail) {
            alert('Signup Unsuccesful');
          } else {
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='signup-container'>

      <div className='signup-content'>
        <div className="login-image">
          <img src={logo} alt="Logo" className="logo-image" /></div>
        <h2 className='signup-title'>Create Account</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className='form-control'
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='surname'>
              <strong>Surname</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Surname'
              name='surname'
              onChange={handleInput}
              className='form-control'
            />
            {errors.surname && <span className='text-danger'>{errors.surname}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='username'>
              <strong>Username</strong>
            </label>
            <input
              type='username'
              placeholder='Enter Username'
              name='username'
              onChange={handleInput}
              className='form-control'
            />
            {errors.username && <span className='text-danger'>{errors.username}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='memberstatus'>
              <strong>Member Status</strong>
            </label>
            <select
              name='memberstatus'
              onChange={handleInput}
              className='form-control'
              value={values.memberstatus}
            >
              <option value=''>Select</option>
              <option value='instructor'>instructor</option>
              <option value='user'>user</option>
            </select>
          </div>
          <div>
            <button type='submit' className='signup-btn'>
              Sign up
            </button>

            <Link to='/' className='login-link'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

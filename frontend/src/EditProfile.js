import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios'
import './Profile.css';



function EditProfile() {
    const [values, setValues] = useState({
        username: localStorage.getItem('username') || "",
        password: localStorage.getItem('password') || "",
        name: localStorage.getItem('name') || "",
        surname: localStorage.getItem('surname') || "",
        email: localStorage.getItem('email') || ""
    });
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post('http://localhost:8081/editprofile', values)
            .then(res => {
                if (res.data.success) {

                    localStorage.setItem('name', values.name);
                    localStorage.setItem('surname', values.surname);
                    localStorage.setItem('username', values.username);
                    localStorage.setItem('password', values.password);
                    localStorage.setItem('email', values.email);
                    navigate('/profile');
                } else {
                    alert("Fail");
                }
            })
            .catch(err => console.log(err));


    }


    return (
        <div>
            <Navbar />  { }
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-50 '>
                    <h2>Edit Profile</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="username"> <strong>Username</strong></label>
                            <input type="username" defaultValue={username} name='username'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"> <strong>Password</strong></label>
                            <input type="password" defaultValue={password} name='password'
                                onChange={handleInput} className='form-control rounded-0' />

                        </div>
                        <div className='mb-3'>
                            <label htmlFor="name"> <strong>Name</strong></label>
                            <input type="name" defaultValue={name} name='name'
                                onChange={handleInput} className='form-control rounded-0' />

                        </div>
                        <div className='mb-3'>
                            <label htmlFor="surname"><strong>Surname</strong></label>
                            <input type="surname" defaultValue={surname} name='surname'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" defaultValue={email} name='email'
                                onChange={handleInput} className='form-control rounded-0' readOnly />
                        </div>

                        <button type='submit' className='btn btn-success w-100 green-btn'> Save Changes </button>
                        <p></p>
                        <Link to="/profile" className='btn btn-success w-100 green-btn '> Go back to Profile </Link>


                    </form>
                </div>
            </div>
        </div>
    )

}



export default EditProfile
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios'


function EditWorkshop() {
    const [values, setValues] = useState({
        name: localStorage.getItem('name') || "",
        date: localStorage.getItem('date') || "",
        time: localStorage.getItem('time') || "",
        location: localStorage.getItem('location') || "",
        quota: localStorage.getItem('quota') || "",
        description: localStorage.getItem('description') || "",
        organizer: localStorage.getItem('organizer') || ""

    });
    const name = localStorage.getItem('name');
    const date = localStorage.getItem('date');
    const time = localStorage.getItem('time');
    const location = localStorage.getItem('location');
    const quota = localStorage.getItem('quota');
    const description = localStorage.getItem('description');
    const organizer = localStorage.getItem('organizer');

    const navigate = useNavigate();
    const handleInput = (workshop) => {
        setValues(prev => ({ ...prev, [workshop.target.name]: workshop.target.value }))
    }
    const handleSubmit = (workshop) => {
        workshop.preventDefault();


        axios.post('http://localhost:8081/editworkshop', values)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('name', values.name);
                    localStorage.setItem('date', values.date);
                    localStorage.setItem('time', values.time);
                    localStorage.setItem('location', values.location);
                    localStorage.setItem('quota', values.quota);
                    localStorage.setItem('description', values.description);
                    localStorage.setItem('organizer', values.organizer);
                    navigate('/');
                } else {
                    alert("Fail");
                }
            }, [])
            .catch(err => console.log(err));


    }


    return (
        <div>
            <Navbar />  { }
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-50 '>
                    <h2>Edit Workshop</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"> <strong>Name</strong></label>
                            <input type="name" defaultValue={name} name='name'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="date"> <strong>Date</strong></label>
                            <input type="date" defaultValue={date} name='date'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="time"> <strong>Time</strong></label>
                            <input type="time" defaultValue={time} name='time'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="location"><strong>Location</strong></label>
                            <input type="location" defaultValue={location} name='location'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="quota"><strong>Quota</strong></label>
                            <input type="quota" defaultValue={quota} name='quota'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="description"><strong>Description</strong></label>
                            <input type="description" defaultValue={description} name='description'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="organizer"><strong>Organizer</strong></label>
                            <input type="organizer" defaultValue={organizer} name='organizer'
                                onChange={handleInput} className='form-control rounded-0' readOnly />
                        </div>

                        <button type='submit' className='btn btn-success w-100 green-btn'> Save Changes </button>
                        <p></p>
                        <Link to="/organizedworkshops" className='btn btn-success w-100 green-btn '> Go back to Workshops </Link>


                    </form>
                </div>
            </div>
        </div>
    )

}



export default EditWorkshop
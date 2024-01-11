import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './ForgotPasswordValidation';
import axios from 'axios'





function ForgotPassword() {
    const [ values,setValues ]= useState({
        password:"",
        email:"",
        uniquekey:""
       
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput= (event)=>{
    setValues(prev =>( {...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit=(event)=> {
        event.preventDefault();
        setErrors(validation(values));
        if( errors.password === "" && errors.email === "" && errors.uniquekey === ""  ){
            axios.post('http://localhost:8081/forgotpassword',values)
           .then(res => {
            if(res.data.fail){
                alert("Email or Unique Key is wrong");
                
            } else if (res.data.success) {
                alert("Password changed successfuly")
                navigate('/');
            }
           }) 
           
            .catch(err => console.log(err));}
       
      
    }

    
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-50 '>
         <h2>Forgot Password</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"> <strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="uniquekey"> <strong>Unique Key</strong></label>
                    <input type="uniquekey" placeholder='Enter Unique Key' name='uniquekey'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.uniquekey && <span className='text-danger'> {errors.uniquekey}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                   
                </div>
                <button type='submit' className='btn btn-success w-100 green-btn'> Forgot Password</button>
                
                
            </form>
         </div>
        </div>
    )
   
    }
   
    

export default ForgotPassword
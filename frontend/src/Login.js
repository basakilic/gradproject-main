import React ,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './LoginValidation';
import axios from 'axios'
import './Login.css';


function Login() {
    const [ values,setValues ]= useState({
        email:'',
        password:'',
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput= (event)=>{
    setValues(prev =>( {...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit=(event)=> {
        event.preventDefault();
        const err = validation({email:values.email , password:values.password});
        setErrors(validation({email:values.email , password:values.password})); setErrors(err);
        if( errors.email === "" && errors.password === ""  ){
            
            axios.post('http://localhost:8081/login', {email:values.email , password:values.password })
           .then(res => {
            if(res.data.success){
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('surname', res.data.surname);
                localStorage.setItem('email', values.email);
                localStorage.setItem('memberstatus', res.data.memberstatus);
                
                navigate('/homepage');
            } else {
                alert("Email or Password is wrong");
            }
           }) 
           
            .catch(err => console.log(err));}
       
      
    }
    useEffect(() => {
        
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('email');

      }, []);
   
    return (

        <div className='d-flex justify-content-center align-items-center  vh-100'>
         <div className='bg-white p-3 rounded w-50 '>

         <h2>Log-In</h2>
            <form action="" onSubmit={handleSubmit}>
            
                <div className='mb-3'>
                    <label htmlFor="email"> <strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 green-btn'> Log in </button>
                <p>You agreed to our terms and policies</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none  '> Create Account</Link>
                <p></p>
                <Link to="/forgotpassword" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none  '> Forgot Password</Link>
                
            </form>
         </div>
        </div>
        
    )
}

export default Login 
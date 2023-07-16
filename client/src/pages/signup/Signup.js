import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.scss"
import { axiosClient } from '../../utils/axiosClient';
import logoImg from "../../assets/logo.png"

function Signup() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password
            });
            console.log(result);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='Signup'>
            <div className="login-container">
            <div className="logo-container">
            <img src={logoImg} alt="Logo" className="logo" />
            </div>
            <div className="signup-box">
                <h2 className="heading">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className='name' onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className='email' onChange={(e) => setEmail(e.target.value)}/>
    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className='password' onChange={(e) => setPassword(e.target.value)}/>
    
                    <input type="submit" className="submit" />
                </form>
                <p className='subheading'>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
            </div>
        </div>
      )
}

export default Signup
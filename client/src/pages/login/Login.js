import React, { useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom';
import {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
//import axiosClient from '../../utils/axiosClient';
import logoImg from "../../assets/logo.png";


function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });
            
            setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
            navigate('/');
            
            //console.log(result);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='Login'>

        <div className="login-container">
        <div className="logo-container">
          <img src={logoImg} alt="Logo" className="logo" />
        </div>

        <div className="login-box">
            <h2 className="heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className='email' onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" className='password' onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" className="submit" />
            </form>
            <p className='subheading'>Do not have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Login
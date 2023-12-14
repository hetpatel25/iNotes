import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../shared';

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password:""});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
          });
        
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Logged in successfully", "success");

        }else
        {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
     }
    return (
        <div>
            <h1 className='my-2'>Login to continue iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials?.email} onChange={onChange} aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials?.password} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

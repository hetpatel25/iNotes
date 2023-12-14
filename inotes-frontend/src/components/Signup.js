import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../shared';

const Signup = (props) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const checkConstraints = () => {

        const { name, password, cpassword } = credentials;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

        if (cpassword != password) {
            props.createNotification('warning', 'Invalid credentials');
            return false;
        }

        if (name.length < 5) {
            props.createNotification('warning', 'Your name length must be at least 5');
            return false;
        }

        if (name.length > 30) {
            props.createNotification('warning', "Your name length can't be greater than 30");
            return false;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            props.createNotification('warning', 'Name should contain only alphabets and spaces');
            return false;
        }

        if (name.trim().length === 0) {

            props.createNotification('warning', 'Name cannot contain only spaces');
            return false;
        }

        if (password.length < 8) {
            props.createNotification('warning', 'Password must have at least 8 characters');
            return false;
        }

        if (password.length > 30) {
            props.createNotification('warning', "Password length can't be greater than 30");
            return false;
        }

        if (!passwordRegex.test(password)) {
            props.createNotification('warning', 'Password must have at least one capital-small letter, special character, number');
            return false;
        }

        return true;

    }

    const handleSubmit = async (e) => {

        props.setProgress(30);

        try {

            e.preventDefault();

            if (!checkConstraints())
                return;
            const { name, email, password } = credentials;
            const response = await fetch(`${baseUrl}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.createNotification('success', 'Account created successfully')
            } else {
                props.createNotification('warning', `${json.error}`)
            }

        } catch (error) {
            props.createNotification('warning', `Internal server error`);
        } finally {
            props.setProgress(100);
        }

    }
    return (
        <div>
            <h1 className='my-2'>Create account to use iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

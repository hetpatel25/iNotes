import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import { baseUrl } from '../shared';

const Signup = (props) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password:"", cpassword:""});

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
     }

     const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`${baseUrl}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
          });
        
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Account created successfully", "success");


        }else
        {
           props.showAlert("Invalid details", "danger");
        }
    }
    return (
        <div>
            <h1 className='my-2'>Create account to use iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
                   
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

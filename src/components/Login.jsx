import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import taskContext from '../context/taskContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const context = useContext(taskContext);
    const {login} = context;

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            
            login(json.authToken, json.user.name);

            alert("Login successful");
            navigate("/")
        } else {
            alert("Login Failed !!")
        }
        } catch (err) {
            console.error("Login Error:", err);
            alert(err.message);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form className='my-3' onSubmit={onSubmit}>
                <h2>Login to TaskTrack</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" id="email" name='email' value={credentials.email} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name='password' value={credentials.password} onChange={onChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link className="my-3" to="/signup">Create new account</Link>
        </div>
    )
}

export default Login

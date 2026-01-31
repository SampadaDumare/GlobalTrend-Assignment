import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import taskContext from '../context/taskContext';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: ""});
    const navigate = useNavigate();
    const context = useContext(taskContext);
    const { login } = context;

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            })

            const json = await response.json();
            console.log(json);
            if (json.success) {

                login(json.authToken, json.user.name);

                alert("Signup successful");
                navigate("/")
            } else {
                alert("Signup Failed !!");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            alert(err.message);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form className='container my-3' onSubmit={onSubmit} autoComplete="off">

                <h2>Signup</h2>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name='name' value={credentials.name} onChange={onChange} className="form-control" />
                </div>
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
        </div>
    )
}

export default Signup

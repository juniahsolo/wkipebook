import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
            try {
                const { data } = await API.post('/api/signup', formData);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await API.post('/api/signin', formData);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div>
            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                {isSignup && <input name="confirmPassword" type="password" placeholder="Repeat Password" onChange={handleChange} required />}
                <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
                <button onClick={switchMode}>
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Auth;

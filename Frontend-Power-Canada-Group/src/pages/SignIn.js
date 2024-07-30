import axios from 'axios';
import React, { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure to include the full URL and correct endpoint
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                email: formData.email,  // Assuming your backend expects 'email' not 'username'
                password: formData.password
            });
            console.log('Login successful:', response.data);
            // Here you can redirect the user or manage login state as needed
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
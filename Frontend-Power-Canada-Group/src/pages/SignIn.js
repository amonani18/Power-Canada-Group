import React, { useState } from 'react';
import axios from 'axios';

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
            await axios.post('/api/signin', formData);
            // Handle successful signin
        } catch (error) {
            // Handle errors
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
// src/pages/SignUp.js
import axios from 'axios';
import React, { useState } from 'react';

const SignUp = ({ setUsers, users }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://power-canada-group-backend.onrender.com/api/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password // Assuming backend handles password hashing
            });
            setUsers([...users, response.data]); // Add new user to users array
            setMessage(`${response.data.name} added to user list.`);
            setFormData({ name: '', email: '', password: '' }); // Clear the form
        } catch (error) {
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;

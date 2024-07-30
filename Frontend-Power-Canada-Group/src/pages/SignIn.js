// SignIn component

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error("Authentication error", error.response.data);
    }
  };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;





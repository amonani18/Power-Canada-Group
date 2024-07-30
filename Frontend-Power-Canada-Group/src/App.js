// src/App.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import UserDashboard from './components/UserDashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios('http://localhost:5000/api/users');
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp setUsers={setUsers} users={users} />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<UserDashboard users={users} />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

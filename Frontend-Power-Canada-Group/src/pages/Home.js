import React from 'react';
import { Link } from 'react-router-dom';
import './Links.css'; 

const Home = () => {
    return (
        <div className="links-container">
        <Link to="/signup" className="link">Sign Up</Link>
        <Link to="/signin" className="link">Sign In</Link>
    </div>
    );
};

export default Home;
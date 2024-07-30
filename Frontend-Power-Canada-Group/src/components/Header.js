import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Header = () => {
    return (
        <header>
               <img src={logo} alt="Company Logo" className="logo-img" />
            <h1>POWER CANADA GROUP</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">My Profile</Link>
                <Link to="/logout">Sign Out</Link>
            </nav>
        </header>
    );
};

export default Header;
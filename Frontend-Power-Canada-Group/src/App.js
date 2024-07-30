import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import UserDashboard from './components/UserDashboard'; // Import the combined UserDashboard
import './App.css'; // Import CSS file for styling

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<UserDashboard />} /> {/* Route for UserDashboard */}
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
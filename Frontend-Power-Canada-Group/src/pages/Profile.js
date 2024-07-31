import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', joined: '' });
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Retrieved from local storage:', storedUser);
        if (storedUser) {
            setUser({
                name: storedUser.name,
                email: storedUser.email,
                joined: storedUser.joined || 'Not specified'
            });
            console.log('State after setting user:', user);
        }
        
    }, []);
    
    

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/user/update', formData);
            localStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
            setUser({ ...user, ...formData });
            setEditing(false);
            navigate('/profile'); // Example usage of navigate
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete('/api/user/delete');
            localStorage.removeItem('user');
            navigate('/'); // Navigate to homepage or login page after deletion
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };


    return (
        <div>
            <h2>My Profile</h2>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Joined: {user.joined}</p>
                <button onClick={handleEditToggle}>Edit</button>
                <button onClick={handleDelete}>Delete Profile</button>
            </div>
        </div>
    );
    
};

export default Profile;

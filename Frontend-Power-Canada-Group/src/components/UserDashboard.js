// src/components/UserDashboard.js

import React from 'react';
import UserList from './UserList';

const UserDashboard = ({ users }) => {
    return (
        <div>
            <h2>User Dashboard</h2>
            <UserList users={users} />
        </div>
    );
};

export default UserDashboard;

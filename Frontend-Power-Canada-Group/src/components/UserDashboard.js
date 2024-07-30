import React, { useState, useEffect } from 'react';

// UserForm Component
const UserForm = ({ addUser, updateUser, editingUser, cancelEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
        }
    }, [editingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser({ ...editingUser, name, email });
        } else {
            addUser({ name, email });
        }
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
            {editingUser && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </form>
    );
};

// UserList Component
const UserList = ({ users, startEditing, deleteUser }) => {
    return (
        <div>
            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => startEditing(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// UserDashboard Component
const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now() }]);
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const startEditing = (user) => {
        setEditingUser(user);
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <UserForm 
                addUser={addUser} 
                updateUser={updateUser} 
                editingUser={editingUser} 
                cancelEdit={cancelEdit} 
            />
            <UserList 
                users={users} 
                startEditing={startEditing} 
                deleteUser={deleteUser} 
            />
        </div>
    );
};

export default UserDashboard;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleDelete = (userId) => {
    console.log("Attempting to delete user with ID:", userId);
    axios.delete(`http://localhost:3001/users/${userId}`)
      .then(() => {
        console.log("User deleted, refreshing list.");
        fetchUsers();  // Refresh the list after deleting
      })
      .catch(error => console.error('Error deleting user:', error));
  };
  
  
  
  
  

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const saveEdit = () => {
    axios.put(`http://localhost:3001/users/${editingUser._id}`, { name: editName, email: editEmail })
      .then(() => {
        fetchUsers();  // Refresh the list after successful update
        setEditingUser(null);  // Reset editing state
        setEditName('');  // Clear edit name state
        setEditEmail('');  // Clear edit email state
      })
      .catch(error => console.error('Error updating user:', error));
  };
  

  return (
    <div>
      <h1>Registered Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {editingUser && editingUser._id === user._id ? (
              <div>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                Name: {user.name}, Email: {user.email}
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users

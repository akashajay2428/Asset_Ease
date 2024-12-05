import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    // Fetch data on component mount and on navigation back
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []); // Empty dependency ensures data is fetched on mount and navigation

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="manage-users">
            <h2>User Management</h2>
            <button className="add-btn">Add User</button>
            <div className="user-list">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="user-item">
                            <p>{user.username} - {user.email}</p>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default ManageUser;

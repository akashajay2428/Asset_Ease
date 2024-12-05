import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-tabs">
                <Link to="/manage-users" className="admin-tab-btn">User Management</Link>
                <Link to="/manage-resources" className="admin-tab-btn">Resource Management</Link>
                <Link to="/resource-requests" className="admin-tab-btn">Resource Requests</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;

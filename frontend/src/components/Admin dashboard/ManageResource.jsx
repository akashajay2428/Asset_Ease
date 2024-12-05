import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const ManageResource = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('/api/resources');
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        fetchResources();
    }, []);

    const handleDeleteResource = async (resourceId) => {
        try {
            await axios.delete(`/api/resources/${resourceId}`);
            setResources(resources.filter(resource => resource.id !== resourceId));
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    return (
        <div className="manage-resources">
            <h2>Resource Management</h2>
            <button className="add-btn">Add Resource</button>
            <div className="resource-list">
                {resources.length > 0 ? (
                    resources.map((resource) => (
                        <div key={resource.id} className="resource-item">
                            <p>{resource.name} - {resource.description}</p>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteResource(resource.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No resources found</p>
                )}
            </div>
        </div>
    );
};

export default ManageResource;

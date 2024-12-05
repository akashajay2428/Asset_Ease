import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const RequestResource = () => {
    const [resourceRequests, setResourceRequests] = useState([]);

    useEffect(() => {
        const fetchResourceRequests = async () => {
            try {
                const response = await axios.get('/api/resourceRequests');
                setResourceRequests(response.data);
            } catch (error) {
                console.error('Error fetching resource requests:', error);
            }
        };
        fetchResourceRequests();
    }, []);

    const handleApproveRequest = async (requestId) => {
        try {
            await axios.put(`/api/resourceRequests/approve/${requestId}`);
            setResourceRequests(resourceRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await axios.put(`/api/resourceRequests/reject/${requestId}`);
            setResourceRequests(resourceRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className="resource-requests">
            <h2>Resource Requests</h2>
            <div className="request-list">
                {resourceRequests.length > 0 ? (
                    resourceRequests.map((request) => (
                        <div key={request.id} className="request-item">
                            <p>{request.user.username} requested {request.resource.name}</p>
                            <button className="approve-btn" onClick={() => handleApproveRequest(request.id)}>Approve</button>
                            <button className="reject-btn" onClick={() => handleRejectRequest(request.id)}>Reject</button>
                        </div>
                    ))
                ) : (
                    <p>No resource requests found</p>
                )}
            </div>
        </div>
    );
};

export default RequestResource;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import './LoginSignup.css';

const LoginSignup = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation to the dashboard

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('http://localhost:4000/admin/login', { email, password });
            const { token } = response.data;
    
            // Store the token in localStorage
            localStorage.setItem('token', token);
    
            // Trigger the onLoginSuccess callback to update the state in the Navbar
            onLoginSuccess();  // This triggers the Navbar to show the profile and logout button
    
            navigate('/admin-dashboard');  // Redirect to the Dashboard
            onClose();  // Close the modal
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Add signup logic here if needed
            // For example:
            // const response = await axios.post('http://localhost:4000/admin/signup', { email, password });

            // Handle success or navigate accordingly
            setIsSignUp(false); // Close signup form after successful signup
            // navigate('/welcome'); // Or any route after signup

        } catch (err) {
            setError(err.response?.data || 'Signup failed');
            console.log(err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>&times;</button>
                {isSignUp ? (
                    <div className="signup-form">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignUp}>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="form-btn">Sign Up</button>
                        </form>
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsSignUp(false)} className="form-link">
                                Sign in here
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="signin-form">
                        <h2>Sign In</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="form-btn">Sign In</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                        <p>
                            Don't have an account?{' '}
                            <span onClick={() => setIsSignUp(true)} className="form-link">
                                Sign up here
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const path = email === 'admin@gmail.com' ? '/admin/login' : '/user/login';
            const response = await axios.post(`http://localhost:4000${path}`, { email, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            onLoginSuccess();

            alert(email === 'admin@gmail.com' ? 'Admin login successful!' : 'User login successful!');
            if (email === 'admin@gmail.com') {
                navigate('/admin-dashboard');
            } else {
                navigate('/');
            }
            onClose();
        } catch (err) {
            alert('Login failed: ' + (err.response?.data || 'Please check your credentials.'));
            setError(err.response?.data || 'Login failed');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:4000/user/register', {
                username,
                email,
                password,
            });

            alert('Sign up successful! Please log in.');
            setIsSignUp(false);
        } catch (err) {
            alert('Signup failed: ' + (err.response?.data || 'Please try again.'));
            setError(err.response?.data || 'Signup failed');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>&times;</button>
                {isSignUp ? (
                    <div className="signup-form">
                        <h2>User Sign Up</h2>
                        <form onSubmit={handleSignUp}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        {error && <p className="error">{error}</p>}
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsSignUp(false)} className="form-link">
                                Sign in here
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="signin-form">
                        <h2>User Sign In</h2>
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

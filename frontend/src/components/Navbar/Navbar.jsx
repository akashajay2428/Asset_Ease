import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { MdAccountCircle } from "react-icons/md";
import './Navbar.css';
import LoginSignup from '../LoginSignup/LoginSignup'; // Import LoginSignup component
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to handle page redirection

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
    const [isAdmin, setIsAdmin] = useState(false); // Track if the logged-in user is an admin
    const navigate = useNavigate(); // useNavigate hook to handle navigation

    // Check if the user is logged in and role is admin from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role'); // Get role from localStorage

        console.log('Token:', token); // Debugging: check if token exists
        console.log('Role:', userRole); // Debugging: check if role exists

        if (token && userRole) {
            setIsLoggedIn(true); // If token exists, set logged-in state to true
            if (userRole === 'admin') {
                setIsAdmin(true); // If role is admin, set admin state to true
            }
        } else {
            setIsLoggedIn(false); // No token means not logged in
            setIsAdmin(false); // Reset admin state if not logged in
        }
    }, [isLoggedIn]); // Add isLoggedIn as dependency to recheck on login/logout

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Function to handle successful login
    const handleLoginSuccess = (userEmail, userRole) => {
        console.log('Login Successful. Email:', userEmail, 'Role:', userRole); // Debugging: check login success details
        setIsLoggedIn(true); // Set logged-in state to true
        setIsModalOpen(false); // Close modal after login
        localStorage.setItem('token', 'your-auth-token'); // Store token in localStorage (Replace with actual token after successful login)
        localStorage.setItem('email', userEmail); // Store email in localStorage
        localStorage.setItem('role', userRole); // Store role in localStorage

        if (userRole === 'admin') {
            setIsAdmin(true); // Set admin state if logged in as admin
        }
    };

    const handleLogout = () => {
        console.log('Logging out...'); // Debugging: check if logout is triggered
        setIsLoggedIn(false); // Reset logged-in state
        setIsAdmin(false); // Reset admin state
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('email'); // Remove email from localStorage
        localStorage.removeItem('role'); // Remove role from localStorage
        navigate('/'); // Redirect to home page after logout
    };

    const handleProfileClick = () => {
        setShowDropdown((prev) => !prev); // Toggle the dropdown on click
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <img src={assets.logo} alt="Logo" className="logo" />
                <ul className="navbar-menu">
                    <li>
                        <Link
                            to="/" // Navigate to root path
                            onClick={() => setMenu("home")}
                            className={menu === 'home' ? 'active' : ''}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <a
                            href="#explore-container"
                            onClick={() => setMenu("menu")}
                            className={menu === 'menu' ? 'active' : ''}
                        >
                            Menu
                        </a>
                    </li>
                    <li>
                        <a
                            href="#app-download"
                            onClick={() => setMenu("mobile app")}
                            className={menu === 'mobile app' ? 'active' : ''}
                        >
                            Mobile App
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            onClick={() => setMenu("contact us")}
                            className={menu === 'contact us' ? 'active' : ''}
                        >
                            Contact Us
                        </a>
                    </li>
                    {/* Conditionally render Admin Dashboard if logged in as admin */}
                    {isAdmin && (
                        <li>
                            <Link
                                to="/admin-dashboard" // Link to the Admin Dashboard
                                className={menu === 'admin-dashboard' ? 'active' : ''}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="profile">
                    <MdAccountCircle
                        className="profile-icon"
                        onClick={handleProfileClick} // Handle profile click
                    />
                    {showDropdown && (
                        <div className="profile-dropdown">
                            {isLoggedIn ? (
                                <button className="dropdown-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="dropdown-btn"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Login/Signup
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <LoginSignup
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onLoginSuccess={handleLoginSuccess} // Pass onLoginSuccess to handle login success
            />
        </div>
    );
};

export default Navbar;

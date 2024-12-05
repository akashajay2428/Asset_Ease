import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <div className="navbar">
                <img src={assets.logo} alt="Logo" className="logo" />
                <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <li>
                        <a
                            onClick={() => {
                                navigate('/');
                                setMenu('home');
                                setIsOpen(false);
                            }}
                            className={menu === 'home' ? 'active' : ''}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#explore-container"
                            onClick={() => {
                                setMenu('menu');
                                setIsOpen(false);
                            }}
                            className={menu === 'menu' ? 'active' : ''}
                        >
                            Menu
                        </a>
                    </li>
                    <li>
                        <a
                            href="#app-download"
                            onClick={() => {
                                setMenu('mobile app');
                                setIsOpen(false);
                            }}
                            className={menu === 'mobile app' ? 'active' : ''}
                        >
                            Mobile App
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            onClick={() => {
                                setMenu('contact us');
                                setIsOpen(false);
                            }}
                            className={menu === 'contact us' ? 'active' : ''}
                        >
                            Contact Us
                        </a>
                    </li>
                </ul>
                <div className="profile">
                    <a href="">Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

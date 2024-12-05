import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header" id="header">
            <div className="header-content">
                <h1 className="header-title">Asset Management System</h1>
                <p className="header-description">
                    Streamline your resources and events efficiently. Manage users, resources, and events with ease!
                </p>
                
                <a href="#explore-container"><button className="header-btn">Get Started</button></a>
            </div>
           
        </header>
    );
};

export default Header;

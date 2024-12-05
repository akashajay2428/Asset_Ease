import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img style={{ borderRadius: '30px' }} src={assets.logo} alt="Asset Management Logo" />
          <p>Your reliable solution for managing and booking resources efficiently.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook} alt="Facebook" />
            <img src={assets.twitter} alt="Twitter" />
            <img src={assets.linkdin} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Links</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Features</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Contact</h2>
          <ul>
            <li>+1-800-555-1234</li>
            <li>support@assetmanager.com</li>
            <li>contact@assetmanager.com</li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        &copy; 2024 Asset Manager Inc. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;

import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaHome, FaInstagram, FaLinkedin, FaMailBulk, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <h4><FaHome size={20} style={{ color: "#fff", marginRight: "10px" }} /></h4>
            <p>Plot 156 Ashwamedh Nagar, near R.T.O office, Nashik</p>
          </div>
          <div className="phone">
            <h4><FaPhone size={20} style={{ color: "#fff", marginRight: "10px" }} />+91 8446275727</h4>
          </div>
          <div className="email">
            <h4><FaMailBulk size={20} style={{ color: "#fff", marginRight: "10px" }} />kasturegaurav07@gmail.com</h4>
          </div>
        </div>
        <div className="middle">
          <h4>Charity Platform</h4>
          </div>
        <div className="right">
          <h4>Socially Active</h4>
          <div className="social">
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} style={{ color: "#fff", marginRight: "20px" }} /></Link>
            <Link to="https://www.linkedin.com/in/gaurav-kasture-3a9504268/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} style={{ color: "#fff", marginRight: "20px" }} /></Link>
            <Link to="https://github.com/GauravKasture07" target="_blank" rel="noopener noreferrer"><FaGithub size={30} style={{ color: "#fff", marginRight: "20px" }} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

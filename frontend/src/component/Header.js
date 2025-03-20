import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Button from 'react-bootstrap/Button';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    
    <header className="Header">
      <nav className="nav-bar">
        <Link to="/" className="logo">Charity.</Link> 

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/charity" onClick={toggleMenu}>Charity</Link></li>
          <li><Link to="/add-charity" onClick={toggleMenu}>Add Charity</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/charity" onClick={toggleMenu}><Button variant="outline-success" size="lg">Donate</Button></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            ☰
          </button>
          <span className="company-name">Gokul Transport</span>
        </div>

        <div className={`navbar-right ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
          <Link to="/home" className="nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link to="/drivers" className="nav-link" onClick={closeMobileMenu}>Drivers</Link>
          <Link to="/vehicles" className="nav-link" onClick={closeMobileMenu}>Vehicles</Link>
          <Link to="/services" className="nav-link" onClick={closeMobileMenu}>Services</Link>
          <Link to="/aboutus" className="nav-link" onClick={closeMobileMenu}>About Us</Link>
          <Link to="/contactus" className="nav-link" onClick={closeMobileMenu}>Contact Us</Link>
          <button className="logout-btn" onClick={() => {
            closeMobileMenu();
            onLogout();
          }}>
            LogOut
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="company-name ">Gokul Transport </span>
        </div>

        <div className="navbar-right">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/drivers" className="nav-link">Drivers</Link>
          <Link to="/vehicles" className="nav-link">Vehicles</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/aboutus" className="nav-link">About Us</Link>
          <Link to="/contactus" className="nav-link">Contact Us</Link>
          <button className="logout-btn" onClick={onLogout}>LogOut</button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;

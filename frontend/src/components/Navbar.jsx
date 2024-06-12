import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Black Grey Minimalist Book Club Logo.png'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to='/' className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="navbar-links">
          <Link to='/' className="navbar-link">Home</Link>
          <Link to='/register' className="navbar-link">Register</Link>
          <Link to='/login' className="navbar-link">Login</Link>
        </div>
      </div>
    </nav>
  );
}
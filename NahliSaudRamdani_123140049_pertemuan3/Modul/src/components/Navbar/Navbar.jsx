import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Task Manager</Link>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Tentang
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

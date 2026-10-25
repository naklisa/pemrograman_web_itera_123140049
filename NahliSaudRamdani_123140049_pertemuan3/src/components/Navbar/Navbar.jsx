import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import './Navbar.css';

function Navbar({ onOpenAddModal }) {
  const { stats } = useBooks();

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">PustakaKu</span>
            <span className="brand-subtitle">Manajemen Buku Pribadi</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Katalog Buku
            <span className="nav-badge" title="Total buku dalam koleksi">
              {stats.total}
            </span>
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Statistik
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Tentang
          </NavLink>
        </nav>

        {/* Quick Action Button */}
        <div className="navbar-actions">
          <button
            type="button"
            className="btn-add-quick"
            onClick={onOpenAddModal}
            id="nav-btn-add-book"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tambah Buku</span>
          </button>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  onOpenAddModal: PropTypes.func.isRequired,
};

export default Navbar;

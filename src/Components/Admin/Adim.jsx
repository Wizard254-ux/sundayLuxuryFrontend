import React, { useState } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-logo">Admin Dashboard</div>

        <button
          className="admin-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        <ul className={`admin-nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/admin-services" onClick={() => setMenuOpen(false)}>Add Service</Link>
          </li>
          <li>
            <Link to="/admin-appointment" onClick={() => setMenuOpen(false)}>Appointments</Link>
          </li>
          <li>
            <Link to="/admin-stats" onClick={() => setMenuOpen(false)}>Statistics</Link>
          </li>
           <li>
            <Link to="/admin-edit" onClick={() => setMenuOpen(false)}>AdminEdit</Link>
          </li>
           <li>
            <Link to="/admin-reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
          </li>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;

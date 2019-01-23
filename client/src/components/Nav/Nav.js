import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === '/'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/saved"
              className={
                window.location.pathname === '/saved'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Saved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

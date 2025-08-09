import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Code, FileText, Home } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Code className="me-2" size={24} />
          SnippetBox
        </Link>
        
        <button 
          className="navbar-toggler d-lg-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ 
            border: 'none', 
            background: 'transparent',
            color: 'var(--text-primary)'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <Home size={18} className="me-1" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/paste">
                <FileText size={18} className="me-1" />
                My Pastes
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

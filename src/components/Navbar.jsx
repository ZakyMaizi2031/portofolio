import React from 'react';
import { User, Calculator, FileText, Share2 } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar no-print">
      <div className="navbar-container glass-panel">
        <div className="navbar-logo" onClick={() => setActiveTab('home')}>
          <span className="logo-icon">&lt;/&gt;</span>
          <span className="logo-text gradient-text">MyDevPorto</span>
        </div>
        
        <div className="navbar-links">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={18} />
            <span>Rapor & Skills</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'cv' ? 'active' : ''}`}
            onClick={() => setActiveTab('cv')}
          >
            <FileText size={18} />
            <span>CV Builder</span>
          </button>
        </div>

        <div className="navbar-actions">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="secondary-btn share-btn"
          >
            <Share2 size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

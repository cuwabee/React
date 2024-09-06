import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import '../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Roman Catalogue</Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher un roman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Accueil</Link></li>
            <li><Link to="/catalogue" onClick={toggleMenu}>Catalogue</Link></li>
            <li><Link to="/genres" onClick={toggleMenu}>Genres</Link></li>
            <li><Link to="/nouveautes" onClick={toggleMenu}>Nouveautés</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Cart />
          <Link to="/login" className="login-btn">Connexion</Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;  
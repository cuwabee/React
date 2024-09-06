import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos de Roman Catalogue</h3>
          <p>Roman Catalogue est votre destination en ligne pour découvrir, lire et partager des romans passionnants. Explorez notre vaste collection et trouvez votre prochaine lecture préférée.</p>
        </div>
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/nouveautes">Nouveautés</Link></li>
            <li><Link to="/genres">Genres</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@romancatalogue.com</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Roman Catalogue. Tous droits réservés.</p>
        <div className="footer-links">
          <Link to="/confidentialite">Politique de confidentialité</Link>
          <Link to="/conditions">Conditions d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="home-link">Retour à l'accueil</Link>
    </div>
  );
}

export default NotFound;
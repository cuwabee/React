import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import NovelList from '../components/NovelList';
import Recommendations from '../components/Recommendations';
import '../styles/Home.css';

function Home() {
  const [featuredNovels, setFeaturedNovels] = useState([]);
  const { loading, error, request } = useApi();

  const fetchFeaturedNovels = useCallback(async () => {
    try {
      const data = await request('get', '/novels/search', { 
        params: { sortBy: 'rating', order: 'desc', limit: 5 } 
      });
      setFeaturedNovels(data.novels);
    } catch (err) {
      console.error('Failed to fetch featured novels:', err);
    }
  }, [request]);

  useEffect(() => {
    fetchFeaturedNovels();
  }, [fetchFeaturedNovels]);

  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenue sur Roman Catalogue</h1>
        <p>Découvrez notre sélection de romans passionnants et trouvez votre prochaine lecture préférée.</p>
        <Link to="/catalogue" className="cta-button">Explorer le catalogue</Link>
      </section>

      <section className="featured-novels">
        <h2>Romans en vedette</h2>
        {loading ? (
          <p>Chargement des romans en vedette...</p>
        ) : error ? (
          <p>Erreur lors du chargement des romans en vedette: {error}</p>
        ) : (
          <NovelList novels={featuredNovels} />
        )}
      </section>

      <Recommendations />

      <section className="about">
        <h2>À propos de Roman Catalogue</h2>
        <p>Roman Catalogue est votre destination en ligne pour découvrir, lire et partager des romans passionnants. Avec notre vaste collection et nos recommandations personnalisées, vous trouverez toujours votre prochaine lecture captivante.</p>
      </section>
    </div>
  );
}

export default Home;
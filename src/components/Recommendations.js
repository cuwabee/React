import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import NovelList from './NovelList';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const { loading, error, request } = useApi();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const data = await request('get', '/users/recommendations');
      setRecommendations(data);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    }
  };

  if (loading) return <div>Chargement des recommandations...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <section className="recommendations">
      <h2>Recommandations pour vous</h2>
      {recommendations.length > 0 ? (
        <NovelList novels={recommendations} />
      ) : (
        <p>Aucune recommandation disponible pour le moment. Continuez à explorer notre catalogue !</p>
      )}
    </section>
  );
}

export default Recommendations;
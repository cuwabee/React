import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import NovelList from '../components/NovelList';
import '../styles/Nouveautes.css';

function Nouveautes() {
  const [newNovels, setNewNovels] = useState([]);
  const { loading, error, request } = useApi();

  const fetchNewNovels = useCallback(async () => {
    try {
      const data = await request('get', '/novels/search', { 
        params: { sortBy: 'createdAt', order: 'desc', limit: 10 } 
      });
      setNewNovels(data.novels);
    } catch (err) {
      console.error('Erreur lors du chargement des nouveautés:', err);
    }
  }, [request]);

  useEffect(() => {
    fetchNewNovels();
  }, [fetchNewNovels]);

  return (
    <div className="nouveautes-container">
      <h1>Nouveautés</h1>
      {loading ? (
        <p>Chargement des nouveautés...</p>
      ) : error ? (
        <p>Erreur lors du chargement des nouveautés: {error}</p>
      ) : (
        <>
          <p>Découvrez nos derniers romans ajoutés :</p>
          <NovelList novels={newNovels} />
        </>
      )}
    </div>
  );
}

export default Nouveautes;
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import '../styles/Genres.css';

function Genres() {
  const [genres, setGenres] = useState([]);
  const { loading, error, request } = useApi();

  const fetchGenres = useCallback(async () => {
    try {
      const data = await request('get', '/novels/genres');
      setGenres(data);
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    }
  }, [request]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <div className="genres-container">
      <h1>Genres</h1>
      {loading ? (
        <p>Chargement des genres...</p>
      ) : error ? (
        <p>Erreur lors du chargement des genres: {error}</p>
      ) : (
        <div className="genre-list">
          {genres.map((genre) => (
            <Link key={genre} to={`/catalogue?genre=${genre}`} className="genre-item">
              <div className="genre-card">
                <h3>{genre}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Genres;
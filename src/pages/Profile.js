import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import NovelList from '../components/NovelList';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [readNovels, setReadNovels] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const { loading, error, request } = useApi();

  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await request('get', '/users/profile');
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    }
  }, [request]);

  const fetchReadNovels = useCallback(async () => {
    try {
      const data = await request('get', '/users/read-novels');
      setReadNovels(data);
    } catch (err) {
      console.error('Failed to fetch read novels:', err);
    }
  }, [request]);

  const fetchFavoriteGenres = useCallback(async () => {
    try {
      const data = await request('get', '/users/favorite-genres');
      setFavoriteGenres(data);
    } catch (err) {
      console.error('Failed to fetch favorite genres:', err);
    }
  }, [request]);

  useEffect(() => {
    fetchUserProfile();
    fetchReadNovels();
    fetchFavoriteGenres();
  }, [fetchUserProfile, fetchReadNovels, fetchFavoriteGenres]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await request('put', '/users/profile', user);
      setUser(updatedUser);
      alert('Profil mis à jour avec succès !');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Erreur lors de la mise à jour du profil.');
    }
  };

  if (loading) return <div className="loading">Chargement du profil...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;
  if (!user) return <div className="not-found">Utilisateur non trouvé</div>;

  return (
    <div className="profile-container">
      <h1>Profil de {user.username}</h1>
      
      <section className="profile-info">
        <h2>Informations personnelles</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>
          <button type="submit">Mettre à jour le profil</button>
        </form>
      </section>

      <section className="favorite-genres">
        <h2>Genres préférés</h2>
        {favoriteGenres.length > 0 ? (
          <ul>
            {favoriteGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun genre préféré pour le moment.</p>
        )}
      </section>

      <section className="read-novels">
        <h2>Romans lus</h2>
        {readNovels.length > 0 ? (
          <NovelList novels={readNovels} />
        ) : (
          <p>Aucun roman lu pour le moment.</p>
        )}
      </section>
    </div>
  );
}

export default Profile;
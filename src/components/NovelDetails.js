import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import CommentSection from './CommentSection';
import '../styles/NovelDetail.css';

function NovelDetail() {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const { loading, error, request } = useApi();

  useEffect(() => {
    fetchNovel();
  }, [id]);

  const fetchNovel = async () => {
    try {
      const data = await request('get', `/novels/${id}`);
      setNovel(data);
    } catch (err) {
      console.error('Failed to fetch novel details:', err);
    }
  };

  const handleAddToCart = async (chapterId) => {
    try {
      await request('post', '/cart/add', { novelId: id, chapterId });
      alert('Chapitre ajouté au panier');
    } catch (err) {
      console.error('Failed to add chapter to cart:', err);
      alert('Erreur lors de l ajout au panier');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!novel) return <div className="not-found">Roman non trouvé</div>;

  return (
    <div className="novel-detail">
      <div className="novel-header">
        <img src={novel.coverImage} alt={`Couverture de ${novel.title}`} className="novel-cover" />
        <div className="novel-info">
          <h1>{novel.title}</h1>
          <h2>par {novel.author}</h2>
          <p className="novel-genre">Genre: {novel.genre}</p>
          <p className="novel-rating">Note moyenne: {novel.averageRating.toFixed(1)} / 5</p>
        </div>
      </div>

      <div className="novel-description">
        <h3>Description</h3>
        <p>{novel.description}</p>
      </div>

      <div className="novel-chapters">
        <h3>Chapitres disponibles</h3>
        <ul>
          {novel.chapters.map((chapter) => (
            <li key={chapter._id}>
              <span>{chapter.title}</span>
              <span>{chapter.price.toFixed(2)} €</span>
              <button onClick={() => handleAddToCart(chapter._id)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
      </div>

      <CommentSection novelId={id} comments={novel.comments} />

      <div className="novel-actions">
        <Link to="/catalogue" className="back-button">Retour au catalogue</Link>
      </div>
    </div>
  );
}

export default NovelDetail;
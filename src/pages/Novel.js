import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import '../styles/Novel.css';

function Novel() {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { loading, error, request } = useApi();

  useEffect(() => {
    fetchNovel();
  }, [id]);

  const fetchNovel = async () => {
    try {
      const data = await request('get', `/novels/${id}`);
      setNovel(data);
    } catch (err) {
      console.error('Failed to fetch novel:', err);
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

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!novel) return <div className="not-found">Roman non trouvé</div>;

  return (
    <div className="novel-container">
      <div className="novel-header">
        <img src={novel.coverImage} alt={novel.title} className="novel-cover" />
        <div className="novel-info">
          <h1>{novel.title}</h1>
          <h2>par {novel.author}</h2>
          <p className="novel-genre">Genre: {novel.genre}</p>
          <p className="novel-rating">Note: {novel.averageRating.toFixed(1)}/5</p>
          <p className="novel-description">{novel.description}</p>
        </div>
      </div>

      <div className="novel-chapters">
        <h3>Chapitres disponibles</h3>
        <ul>
          {novel.chapters.map((chapter) => (
            <li key={chapter._id}>
              <span>{chapter.title}</span>
              <span>{chapter.price.toFixed(2)} €</span>
              <button onClick={() => handleChapterSelect(chapter)}>Aperçu</button>
              <button onClick={() => handleAddToCart(chapter._id)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedChapter && (
        <div className="chapter-preview">
          <h3>Aperçu: {selectedChapter.title}</h3>
          <p>{selectedChapter.preview}</p>
        </div>
      )}

      <div className="novel-reviews">
        <h3>Avis des lecteurs</h3>
        {novel.reviews.length > 0 ? (
          <ul>
            {novel.reviews.map((review) => (
              <li key={review._id}>
                <p>{review.content}</p>
                <p>Note: {review.rating}/5</p>
                <p>Par: {review.user.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun avis pour le moment.</p>
        )}
      </div>

      <Link to="/catalogue" className="back-button">Retour au catalogue</Link>
    </div>
  );
}

export default Novel;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NovelList.css';

function NovelList({ novels }) {
  if (!novels || novels.length === 0) {
    return <p>Aucun roman disponible pour le moment.</p>;
  }

  return (
    <div className="novel-list">
      {novels.map((novel) => (
        <div key={novel._id} className="novel-card">
          <img 
            src={novel.coverImage || 'path/to/default/image.jpg'} 
            alt={`Couverture de ${novel.title}`} 
            className="novel-cover"
          />
          <div className="novel-info">
            <h3>{novel.title}</h3>
            <p className="novel-author">par {novel.author}</p>
            <p className="novel-genre">{novel.genre}</p>
            <p className="novel-rating">Note: {novel.averageRating.toFixed(1)}/5</p>
            <Link to={`/novel/${novel._id}`} className="novel-link">
              Voir les détails
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NovelList;
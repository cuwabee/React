import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
}

export default Pagination;
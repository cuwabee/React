(function() {
  // Fonction pour ouvrir le modal de partage
  function openShareModal(title, url) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-content">
        <h2>Partager "${title}"</h2>
        <p>Partagez ce roman avec vos amis :</p>
        <div class="share-buttons">
          <button class="share-button facebook">Facebook</button>
          <button class="share-button twitter">Twitter</button>
          <button class="share-button email">Email</button>
        </div>
        <button class="close-button">&times;</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Gérer la fermeture du modal
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Gérer les clics sur les boutons de partage
    const shareButtons = modal.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
      button.addEventListener('click', () => {
        let shareUrl;
        switch(button.className.split(' ')[1]) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
          case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
            break;
        }
        window.open(shareUrl, '_blank');
      });
    });
  }

  // Attendre que le DOM soit chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Chercher tous les boutons de partage
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.getAttribute('data-title');
        const url = this.getAttribute('data-url');
        openShareModal(title, url);
      });
    });
  });
})();
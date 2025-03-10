import React from 'react';

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button 
      className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
      onClick={onClick}
    >
      {/* Corazón lleno cuando es favorito, vacío cuando no lo es */}
      <i className={`fa ${isFavorite ? 'fa-heart' : 'fa-heart-o'}`} style={{ fontSize: '20px' }}></i>
      <span>{isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}</span>
    </button>
  );
};

export default FavoriteButton;

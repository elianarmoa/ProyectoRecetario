import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  // Obtenemos los favoritos de localStorage al iniciar la aplicación
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Función para guardar una receta como favorita
  const saveFavorite = (recipe) => {
    const newFavorites = [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));  // Guardamos en localStorage
  };

  // Función para eliminar una receta de los favoritos
  const removeFavorite = (idMeal) => {
    const newFavorites = favorites.filter(fav => fav.idMeal !== idMeal);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));  // Guardamos en localStorage
  };

  return (
    <UserPreferencesContext.Provider value={{ favorites, saveFavorite, removeFavorite }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};


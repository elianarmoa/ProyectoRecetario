import React, { useContext } from 'react';
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';
import RecipeCard from './RecipeCard';  // Usamos RecipeCard para mostrar las recetas


const FavoritesPage = () => {
  const { favorites } = useContext(UserPreferencesContext);  // Obtenemos las recetas favoritas

  return (
    <div className="favorites-page">
      <h2>Mis Favoritos</h2>
      {/* Si no hay favoritos, mostramos un mensaje */}
      {favorites.length === 0 ? (
        <p>No tienes recetas favoritas aún.</p>
      ) : (
        <div className="favorites-list">
          {/* Iteramos sobre las recetas favoritas y las mostramos */}
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

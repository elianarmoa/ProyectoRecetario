import React, { useContext } from 'react';
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';
import FavoriteButton from './FavoriteButton';

const RecipeCard = ({ recipe }) => {
  const { favorites, saveFavorite, removeFavorite } = useContext(UserPreferencesContext);

  // Verificamos si la receta está marcada como favorita
  const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);

  // Función que maneja el clic en el botón de favoritos
  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.idMeal);  // Eliminar de favoritos
    } else {
      saveFavorite(recipe);  // Agregar a favoritos
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      {/* El botón de favoritos que cambia según si la receta es favorita */}
      <FavoriteButton isFavorite={isFavorite} onClick={handleFavorite} />
    </div>
  );
};

export default RecipeCard;

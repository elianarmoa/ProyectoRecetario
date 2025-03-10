import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState(''); // Estado para la búsqueda
  const [meals, setMeals] = useState([]); // Estado para las recetas encontradas
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return; // No hacer nada si no hay query

    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setMeals(data.meals || []); // Guardamos las recetas encontradas
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
    } finally {
      setLoading(false); // Desactivamos el estado de carga
    }
  };

  return (
    <div className="search-container">
      <h1>Buscar Recetas</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre de receta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="meal-grid">
          {meals.length === 0 ? (
            <p>No se encontraron recetas</p>
          ) : (
            meals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <h2>{meal.strMeal}</h2>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image"
                />
                <a href={`/meal/${meal.idMeal}`} className="details-link">
                  Ver detalles
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

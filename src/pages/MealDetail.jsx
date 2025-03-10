import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MealDetail.css';

const MealDetail = () => {
  const { id } = useParams();
  const [mealDetail, setMealDetail] = useState(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setMealDetail(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error('Error al obtener los detalles de la receta:', error);
      }
    };

    fetchMealDetail();
  }, [id]);

  if (!mealDetail) {
    return <p>Cargando detalles de la receta...</p>;
  }

  return (
    <div className="meal-detail-container">
      <Link to="/" className="back-button">Volver</Link>
      <h1>{mealDetail.strMeal}</h1>
      <img src={mealDetail.strMealThumb} alt={mealDetail.strMeal} className="meal-image" />
      <div className="meal-info">
        <h3>Ingredientes</h3>
        <ul className="ingredients-list">
          {Object.keys(mealDetail).map((key) => {
            if (key.includes('strIngredient') && mealDetail[key]) {
              return <li key={key}>{mealDetail[key]}</li>;
            }
            return null;
          })}
        </ul>
        <h3>Instrucciones</h3>
        <p>{mealDetail.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetail;

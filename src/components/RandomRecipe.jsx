// components/RandomRecipe.jsx
import React, { useEffect, useState } from 'react';
import { getRandomRecipe } from '../services/api';

const RandomRecipe = () => {
const [recipe, setRecipe] = useState(null);

useEffect(() => {
    const fetchRecipe = async () => {
    const data = await getRandomRecipe();
    setRecipe(data);
    };

    fetchRecipe();
}, []);

if (!recipe) return <p>Loading...</p>;

return (
    <div className="random-recipe">
    <h2>Random Recipe</h2>
    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
    <h3>{recipe.strMeal}</h3>
    <p>{recipe.strInstructions}</p>
    </div>
);
};

export default RandomRecipe;

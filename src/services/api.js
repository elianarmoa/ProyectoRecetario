const fetchMeals = async (query) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  };
  
  export { fetchMeals };
  // services/api.js
const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${API_BASE}/random.php`);
    const data = await response.json();
    
    if (data.meals && data.meals.length > 0) {
      return data.meals[0]; // Retorna la receta aleatoriaÑ
    } else {
      return null; // Devuelve null si no hay recetas
    }
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
};



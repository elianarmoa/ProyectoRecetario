import React, { useState, useEffect, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import './Home.css';
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';
import { getRandomRecipe } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  const { favorites, saveFavorite, removeFavorite, addSearchHistory } = useContext(UserPreferencesContext);
  const [randomRecipe, setRandomRecipe] = useState(null);

  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Recuperar del localStorage
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode); // Aplicar la clase al <body>
    localStorage.setItem("darkMode", darkMode); // Guardar preferencia en localStorage
  }, [darkMode]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`);
        const data = await response.json();

        if (data.meals) {
          setMeals(data.meals.slice(0, 50));
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchRandomRecipe = async () => {
      const recipe = await getRandomRecipe();
      setRandomRecipe(recipe);
    };

    fetchMeals();
    fetchRandomRecipe();
  }, []);

  const filteredMeals = meals.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [searchTerm, totalPages]);

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      <Header />

      {/* Botón para cambiar a Dark Mode */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <div className="content">
        <h1>Lista de Comidas</h1>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar receta..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              addSearchHistory(e.target.value);
            }}
          />
        </div>

        {loading ? (
          <p>Cargando comidas...</p>
        ) : (
          <>
            <div className="favorites-section">
              <h2>Favoritos</h2>
              <div className="meal-grid">
                {favorites.length === 0 ? (
                  <p>No tienes recetas favoritas aún.</p>
                ) : (
                  favorites.map((meal) => (
                    <div key={meal.idMeal} className="meal-card">
                      <h2>{meal.strMeal}</h2>
                      <img src={meal.strMealThumb} alt={meal.strMeal} />
                      <div className="meal-actions">
                        <button
                          className="favorite-btn"
                          onClick={() =>
                            favorites.some(fav => fav.idMeal === meal.idMeal)
                              ? removeFavorite(meal.idMeal)
                              : saveFavorite(meal)
                          }
                        >
                          <i className={`fa ${favorites.some(fav => fav.idMeal === meal.idMeal) ? 'fa-heart' : 'fa-heart-o'}`} style={{ fontSize: '20px' }}></i>
                        </button>
                        <Link to={`/meal/${meal.idMeal}`} className="details-link">
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="meal-grid">
              {currentMeals.length === 0 ? (
                <p>No se encontraron recetas</p>
              ) : (
                currentMeals.map((meal) => (
                  <div key={meal.idMeal} className="meal-card">
                    <h2>{meal.strMeal}</h2>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className="meal-actions">
                      <button
                        className="favorite-btn"
                        onClick={() =>
                          favorites.some(fav => fav.idMeal === meal.idMeal)
                            ? removeFavorite(meal.idMeal)
                            : saveFavorite(meal)
                        }
                      >
                        <i className={`fa ${favorites.some(fav => fav.idMeal === meal.idMeal) ? 'fa-heart' : 'fa-heart-o'}`} style={{ fontSize: '20px' }}></i>
                      </button>
                      <Link to={`/meal/${meal.idMeal}`} className="details-link">
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </div>

            {randomRecipe && (
              <div className="random-recipe">
                <h2>Receta Aleatoria</h2>
                <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
                <h3>{randomRecipe.strMeal}</h3>
                <p>{randomRecipe.strInstructions}</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;

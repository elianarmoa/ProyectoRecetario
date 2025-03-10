import React, { useState, useContext } from 'react';
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { addSearchHistory } = useContext(UserPreferencesContext);

  const fetchSuggestions = async () => {
    if (searchTerm.length > 2) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      setSuggestions(data.meals || []);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    fetchSuggestions();
  };

  const handleSelect = (suggestion) => {
    setSearchTerm(suggestion.strMeal);
    addSearchHistory(suggestion.strMeal);
    onSearch(suggestion.strMeal);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleChange} 
        placeholder="Buscar receta..." 
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((meal) => (
            <li key={meal.idMeal} onClick={() => handleSelect(meal)}>
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

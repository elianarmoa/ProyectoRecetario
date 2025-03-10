import { useState, useEffect } from 'react';

const useMeals = (query) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setMeals(data.meals || []);
      setLoading(false);
    };

    if (query) fetchMeals();
  }, [query]);

  return { meals, loading };
};

export default useMeals;

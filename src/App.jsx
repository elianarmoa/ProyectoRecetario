import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import Navbar from './components/Navbar';  // Componente de navegación
import HomePage from './pages/HomePage';  // Página principal con las recetas
import FavoritesPage from './pages/FavoritesPage';  // Página de favoritos

const App = () => {
  return (
    <UserPreferencesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Página principal */}
          <Route path="/favorites" element={<FavoritesPage />} />  {/* Página de favoritos */}
        </Routes>
      </Router>
    </UserPreferencesProvider>
  );
};

export default App;

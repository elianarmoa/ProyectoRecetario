// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MealDetail from './pages/MealDetail'; // Esta es la página para ver los detalles de una comida
import { UserPreferencesProvider } from './contexts/UserPreferencesContext'; // Importar el contexto

const root = createRoot(document.getElementById('root'));

root.render(
  <UserPreferencesProvider> {/* Envolver la aplicación con el contexto */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} /> {/* Ruta para el detalle de la comida */}
      </Routes>
    </Router>
  </UserPreferencesProvider>
);

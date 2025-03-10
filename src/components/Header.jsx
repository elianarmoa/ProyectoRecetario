import React from 'react';
import './Header.css'; 

const Header = () => {
return (
    <header className="header">
    <div className="logo">
        <h1>Recipes for you </h1>
    </div>
    <nav>
        <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="mailto:elian_armoa@hotmail.com">Contacto</a></li>
        </ul>
    </nav>
    </header>
);
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'link')}>
        Home
      </NavLink>
      <NavLink to="/busca" className={({ isActive }) => (isActive ? 'active' : 'link')}>
        Busca
      </NavLink>
      <NavLink to="/filme" className={({ isActive }) => (isActive ? 'active' : 'link')}>
        Filmes
      </NavLink>
    </nav>
  );
};

export default Menu;

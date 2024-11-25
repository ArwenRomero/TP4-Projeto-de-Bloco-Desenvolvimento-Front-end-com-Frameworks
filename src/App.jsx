import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';  // Importa a biblioteca de gestos
import Menu from './components/Menu';
import './App.css';
import Home from './components/Home';
import FilmeBusca from './components/FilmeBusca';
import FilmeDetalhes from './components/FilmeDetalhes';

function App() {
  const handlers = useSwipeable({
    onSwipedLeft: () => window.location.href = '/busca', // Navega para a página de busca
    onSwipedRight: () => window.location.href = '/',  // Navega para a home
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Router>
      <div className="pagina-principal" {...handlers}>  {/* Adiciona os gestos ao container principal */}
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/busca" element={<FilmeBusca />} />
          <Route path="/filme/:id" element={<FilmeDetalhes />} />
        </Routes>

        <footer className="rodape">
          <div className="footer-links">
            <a href="/features">Funcionalidades</a>
            <a href="/testimonials">Depoimentos</a>
            <a href="/cadastro">Cadastre-se</a>
          </div>
          <div className="footer-info">
            <p>TP2 de Projeto de Bloco - Arwen Romero</p>
            <p><a href="/politica-de-privacidade">Política de Privacidade</a> | <a href="/termos-de-uso">Termos de Uso</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

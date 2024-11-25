import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFilmes, fetchSugestoes } from '../api';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/Filmebusca.css';

const FilmeBusca = () => {
  const [termo, setTermo] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (termo.trim()) {
      setLoading(true);
      const resultados = await fetchFilmes(termo);
      setFilmes(resultados);
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleInputChange = async (e) => {
    const valor = e.target.value;
    setTermo(valor);
    if (valor.length > 2) {
      const sugestoes = await fetchSugestoes(valor);
      setSuggestions(sugestoes);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="filme-busca">
      <motion.div 
        className="busca-input"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Busque por um filme..."
          value={termo}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <motion.button 
          onClick={handleSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          Buscar
        </motion.button>

        {suggestions.length > 0 && (
          <div className="sugestoes">
            {suggestions.map((sugestao) => (
              <motion.div
                key={sugestao.id}
                className="sugestao-item"
                onClick={() => {
                  setTermo(sugestao.title);
                  handleSearch();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {sugestao.title}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {loading ? (
        <div className="loading-spinner">
          <ClipLoader color="#45b1f5" size={50} />
        </div>
      ) : (
        <motion.div
          className="resultados"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filmes.length > 0 ? (
            <div className="filme-grid">
              {filmes.map((filme) => (
                <Link to={`/filme/${filme.id}`} key={filme.id} className="filme-card">
                  <motion.img
                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                    alt={filme.title}
                    className="filme-poster"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="filme-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="filme-titulo">{filme.title}</h3>
                    <p className="filme-descricao">
                      {filme.overview ? filme.overview.slice(0, 100) + '...' : 'Sem descrição disponível.'}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.p 
              className="sem-resultados"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Nenhum resultado encontrado.
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FilmeBusca;
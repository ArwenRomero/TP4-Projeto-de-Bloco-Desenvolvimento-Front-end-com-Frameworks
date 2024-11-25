import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BounceLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faStar, faFilm } from '@fortawesome/free-solid-svg-icons';
import '../styles/FilmeDetalhes.css';

const FilmeDetalhes = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFilmeDetalhes = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'de3a61eefbdc5a57f95e98812b929488',
            language: 'pt-BR',
          },
        });
        setFilme(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFilmeDetalhes();
  }, [id]);

  if (loading) return <div className="loading"><BounceLoader size={60} color="#36D7B7" /></div>;
  if (error || !filme) return <div className="error">Não foi possível carregar os detalhes do filme.</div>;

  return (
    <div className="filme-detalhes">
      <motion.header 
        className="detalhes-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          className="detalhes-poster"
          src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
          alt={`${filme.title} poster`}
          onError={(e) => (e.target.src = '/default-poster.png')}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="detalhes-info">
          <h1>{filme.title}</h1>
          <p><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Data de lançamento:</strong> {new Date(filme.release_date).toLocaleDateString('pt-BR')}</p>
          <p><FontAwesomeIcon icon={faClock} /> <strong>Duração:</strong> {filme.runtime} minutos</p>
          <p><FontAwesomeIcon icon={faFilm} /> <strong>Gênero:</strong> {filme.genres.map((genre) => genre.name).join(', ')}</p>
          <p><FontAwesomeIcon icon={faStar} /> <strong>Avaliação:</strong> ⭐ {filme.vote_average} / 10</p>
        </div>
      </motion.header>

      <motion.section 
        className="detalhes-sinopse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Sinopse</h2>
        <p>{filme.overview || 'Sinopse não disponível.'}</p>
      </motion.section>

      <motion.section 
        className="detalhes-elenco"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Elenco Principal</h2>
        <Elenco filmeId={id} />
      </motion.section>

      <motion.section 
        className="detalhes-comentarios"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Comentários dos Usuários</h2>
        <Comentarios filmeId={id} />
      </motion.section>
    </div>
  );
};

const Elenco = ({ filmeId }) => {
  const [elenco, setElenco] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchElenco = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${filmeId}/credits`, {
          params: {
            api_key: 'de3a61eefbdc5a57f95e98812b929488',
            language: 'pt-BR',
          },
        });
        setElenco(response.data.cast.slice(0, 5));
      } catch {
        setError(true);
      }
    };
    fetchElenco();
  }, [filmeId]);

  if (error) return <div className="error">Erro ao carregar o elenco.</div>;

  return (
    <div className="elenco-lista">
      {elenco.map((ator) => (
        <motion.div 
          key={ator.id} 
          className="elenco-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={ator.profile_path ? `https://image.tmdb.org/t/p/w200/${ator.profile_path}` : '/default-actor.png'}
            alt={ator.name}
            className="elenco-foto"
          />
          <p>{ator.name}</p>
          <span>como {ator.character}</span>
        </motion.div>
      ))}
    </div>
  );
};

const Comentarios = ({ filmeId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${filmeId}/reviews`, {
          params: {
            api_key: 'de3a61eefbdc5a57f95e98812b929488',
            language: 'pt-BR',
          },
        });
        setComentarios(response.data.results);
      } catch {
        setError(true);
      }
    };
    fetchComentarios();
  }, [filmeId]);

  if (error) return <div className="error">Erro ao carregar os comentários.</div>;

  return (
    <div className="comentarios-lista">
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <motion.div 
            key={comentario.id} 
            className="comentario-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p><strong>{comentario.author}:</strong> {comentario.content}</p>
          </motion.div>
        ))
      ) : (
        <p>Nenhum comentário disponível para este filme.</p>
      )}
    </div>
  );
};

export default FilmeDetalhes;

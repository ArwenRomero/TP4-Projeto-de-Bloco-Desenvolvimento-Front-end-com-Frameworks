import axios from 'axios';

const API_KEY = 'de3a61eefbdc5a57f95e98812b929488';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const fetchFilmes = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};

export const fetchSugestoes = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    return [];
  }
};

export const fetchFilmeDetalhes = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    throw error;
  }
};

export const fetchElenco = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Erro ao buscar elenco:', error);
    throw error;
  }
};

export const fetchComentarios = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    throw error;
  }
};

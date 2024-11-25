import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';  // Importa a biblioteca de gestos
import FilmeBusca from './FilmeBusca';
import '../styles/Home.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const navigate = useNavigate();  // Hook para navegação de páginas

  // Configuração dos gestos de swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('/busca'),  // Desliza para a esquerda e vai para /busca
    onSwipedRight: () => navigate('/'),  // Desliza para a direita e vai para /
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,  // Para suportar também o swipe com o mouse
  });

  return (
    <div className="home-page" {...handlers}>  {/* Adiciona os gestos ao container principal */}
      <header className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Avaliação e Crítica de Filmes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubra filmes, avalie e compartilhe suas opiniões em uma plataforma dedicada aos amantes do cinema.
          </motion.p>
          <Link to="/busca" className="cta-button">
            Explorar Agora
          </Link>
        </div>
      </header>

      <motion.section
        className="filme-busca-secao"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2>Buscar Filmes</h2>
        <FilmeBusca />
      </motion.section>

      <motion.section
        className="about"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2>Sobre a Plataforma</h2>
          <p>
            Nossa plataforma é um ponto de encontro para cinéfilos. Com base nas avaliações de nossos usuários e dados atualizados da API TMDB, proporcionamos uma experiência rica e interativa.
          </p>
          <div className="about-features">
            <div className="feature-item">
              <h3>Integração com TMDB</h3>
              <p>Busque informações detalhadas de filmes diretamente da nossa plataforma.</p>
            </div>
            <div className="feature-item">
              <h3>Comunidade Ativa</h3>
              <p>Interaja com outros usuários e veja as críticas mais recentes.</p>
            </div>
            <div className="feature-item">
              <h3>Recomendações Personalizadas</h3>
              <p>Receba sugestões de filmes com base nas suas avaliações e preferências.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="features"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2>Funcionalidades Principais</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Pesquisa de Filmes</h3>
            <p>Explore um vasto catálogo de filmes, com detalhes e informações exclusivas.</p>
          </div>
          <div className="feature-card">
            <h3>Avaliação de Filmes</h3>
            <p>Classifique filmes de acordo com suas preferências e compartilhe suas opiniões.</p>
          </div>
          <div className="feature-card">
            <h3>Críticas Detalhadas</h3>
            <p>Leia e escreva críticas detalhadas sobre os filmes que você assistiu.</p>
          </div>
          <div className="feature-card">
            <h3>Recomendações Inteligentes</h3>
            <p>Receba recomendações personalizadas com base nas suas preferências.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="testimonials"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2>Depoimentos</h2>
        <div className="testimonials-content">
          <div className="testimonial">
            <p>"Interface intuitiva e fácil de usar. Amei a plataforma!"</p>
            <span>- Lucas Lima</span>
          </div>
          <div className="testimonial">
            <p>"É ótimo ver opiniões e avaliações de outros usuários."</p>
            <span>- Carol Souza</span>
          </div>
          <div className="testimonial">
            <p>"Excelente para encontrar novos filmes baseados no que eu gosto."</p>
            <span>- Ana Pereira</span>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="statistics"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2>Estatísticas da Comunidade</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Filmes Avaliados</p>
            </div>
            <div className="stat-item">
              <h3>5,000+</h3>
              <p>Críticas Publicadas</p>
            </div>
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Usuários Ativos</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Satisfação do Usuário</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="call-to-action"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <h2>Junte-se à Nossa Comunidade</h2>
        <p>Pronto para compartilhar suas críticas e avaliações? Cadastre-se agora e faça parte da nossa comunidade de cinema!</p>
        <Link to="/cadastro" className="cta-button">Cadastre-se</Link>
      </motion.section>
    </div>
  );
}

export default Home;

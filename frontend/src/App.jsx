import React, { useState } from 'react';
import MapaPatrimonios from './features/mapa/components/MapaPatrimonios';
import FormularioSugestao from './features/sugestoes/components/FormularioSugestao';
import patrimoniosMock from './mocks/patrimoniosMock.json';
import './App.css';

export default function App() {
  const [patrimonios] = useState(patrimoniosMock);
  const [abaAtiva, setAbaAtiva] = useState('mapa'); // 'mapa' ou 'sugerir'

  return (
    <div className="app-container">
      {/* Cabeçalho */}
      <header className="app-header">
        <div className="header-content">
          <h1>🏛️ Patrimônio Histórico de Guarulhos</h1>
          <p>Mapeamento cultural e preservação colaborativa</p>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${abaAtiva === 'mapa' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('mapa')}
          >
            🗺️ Ver Mapa
          </button>
          <button
            className={`nav-btn ${abaAtiva === 'sugerir' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('sugerir')}
          >
            ✍️ Sugerir Local
          </button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="app-main">
        {abaAtiva === 'mapa' ? (
          <section className="secao-mapa">
            <h2>Mapa Interativo de Patrimônios</h2>
            <p className="secao-subtitulo">
              Explore os bens culturais, históricos e naturais cadastrados no município.
            </p>
            <MapaPatrimonios patrimonios={patrimonios} />
          </section>
        ) : (
          <section className="secao-sugestao">
            <FormularioSugestao />
          </section>
        )}
      </main>

      {/* Rodapé */}
      <footer className="app-footer">
        <p>© 2026 Mapeamento Cultural de Guarulhos. Projeto Acadêmico / Colaborativo.</p>
      </footer>
    </div>
  );
}
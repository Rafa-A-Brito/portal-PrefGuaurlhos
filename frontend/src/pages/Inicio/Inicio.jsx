import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.png";
import PlaquetaCard from "../../features/mapa/PlaquetaCard";
import patrimoniosMock from "../../features/mocks/patrimoniosMock.json";

export default function Inicio() {
  const navigate = useNavigate();
  const destaques = patrimoniosMock.slice(0, 4);

  return (
    <div>
      <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero-inner">
          <span className="eyebrow">Preserve a nossa história</span>
          <h1>Conheça e valorize o patrimônio de Guarulhos</h1>
          <p className="lede">
            Um mapeamento vivo dos bens históricos, culturais e naturais do
            município — para moradores, estudantes e visitantes redescobrirem a
            cidade.
          </p>

          <div className="searchbar">
            <input type="text" placeholder="Busque por nome, bairro ou CEP" />
            <button>Buscar</button>
          </div>
        </div>
      </section>

      <div className="stats-row">
        <div className="stat-card">
          <div className="n">{patrimoniosMock.length}+</div>
          <div className="l">Bens catalogados</div>
        </div>
        <div className="stat-card">
          <div className="n">4</div>
          <div className="l">Categorias de patrimônio</div>
        </div>
        <div className="stat-card">
          <div className="n">18</div>
          <div className="l">Bairros mapeados</div>
        </div>
        <div className="stat-card">
          <div className="n">1988</div>
          <div className="l">Primeiro tombamento</div>
        </div>
      </div>

      <div className="map-cta">
        <div className="map-cta-inner">
          <div>
            <h2>Explore tudo no mapa interativo</h2>
            <p>
              Veja a localização de cada bem, filtre por categoria e navegue
              pelas rotas históricas de Guarulhos.
            </p>
          </div>
          <button className="map-cta-btn" onClick={() => navigate("/mapa")}>
            🗺️ Abrir o mapa
          </button>
        </div>
      </div>

      <section className="destaques">
        <div className="section-head">
          <div>
            <h2>Destaques</h2>
            <p className="sub">
              Conheça alguns dos bens tombados e catalogados pela plataforma.
            </p>
          </div>
        </div>
        <div className="plaque-grid">
          {destaques.map((item) => (
            <PlaquetaCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

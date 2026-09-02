import { useNavigate } from "react-router-dom";
import {
  BuildingLibraryIcon,
  TagIcon,
  MapPinIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapIcon,
  AcademicCapIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import PlaquetaCard from "../../features/mapa/components/PlaquetaCard";
import { usePatrimoniosContext } from "../../context/PatrimoniosContext";
import hero from "../../assets/hero.png";

const CAT_LABEL = {
  arquitetonico: "Arquitetônico",
  imaterial: "Imaterial",
  natural: "Natural",
  documental: "Documental",
};

export default function Inicio() {
  const navigate = useNavigate();
  const { patrimonios, estatisticas, categorias, carregando } =
    usePatrimoniosContext();
  const destaques = patrimonios.slice(0, 4);

  const irParaAcervo = (categoria) => {
    navigate(categoria ? `/mapa?categoria=${categoria}` : "/mapa");
  };

  return (
    <div>
      {/* ===== HERO ===== */}
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
            <MagnifyingGlassIcon
              width={18}
              height={18}
              className="searchbar-icon"
            />
            <input type="text" placeholder="Busque por nome, bairro ou CEP" />
            <button onClick={() => irParaAcervo()}>Buscar</button>
          </div>
        </div>
      </section>

      {/* ===== ESTATÍSTICAS ===== */}
      <div className="stats-row">
        <div className="stat-card">
          <BuildingLibraryIcon width={22} height={22} className="stat-icon" />
          <div>
            <div className="n">
              {carregando ? "—" : `${estatisticas?.totalBens ?? 0}+`}
            </div>
            <div className="l">Bens catalogados</div>
          </div>
        </div>
        <div className="stat-card">
          <TagIcon width={22} height={22} className="stat-icon" />
          <div>
            <div className="n">
              {carregando ? "—" : (estatisticas?.totalCategorias ?? 0)}
            </div>
            <div className="l">Categorias de patrimônio</div>
          </div>
        </div>
        <div className="stat-card">
          <MapPinIcon width={22} height={22} className="stat-icon" />
          <div>
            <div className="n">
              {carregando ? "—" : (estatisticas?.totalBairros ?? 0)}
            </div>
            <div className="l">Bairros mapeados</div>
          </div>
        </div>
        <div className="stat-card">
          <CalendarDaysIcon width={22} height={22} className="stat-icon" />
          <div>
            <div className="n">
              {carregando ? "—" : estatisticas?.primeiroTombamento}
            </div>
            <div className="l">Primeiro tombamento</div>
          </div>
        </div>
      </div>

      {/* ===== SOBRE O PROJETO ===== */}
      <section className="sobre">
        <div className="sobre-inner">
          <div className="section-head">
            <div>
              <h2>Sobre o projeto</h2>
              <p className="sub">
                Um esforço colaborativo para registrar e valorizar a memória
                cultural do município.
              </p>
            </div>
          </div>
          <div className="sobre-grid">
            <div className="sobre-card">
              <AcademicCapIcon width={24} height={24} />
              <h3>Educar</h3>
              <p>
                Aproxima estudantes e o público jovem da história e da memória
                artística de Guarulhos.
              </p>
            </div>
            <div className="sobre-card">
              <SparklesIcon width={24} height={24} />
              <h3>Preservar</h3>
              <p>
                Centraliza documentos, imagens e curiosidades sobre cada bem
                tombado num só lugar.
              </p>
            </div>
            <div className="sobre-card">
              <UsersIcon width={24} height={24} />
              <h3>Conectar</h3>
              <p>
                Incentiva o turismo cultural e aproxima moradores e visitantes
                da própria história.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIAS ===== */}
      <section className="categorias">
        <div className="section-head">
          <div>
            <h2>Explore por categoria</h2>
            <p className="sub">
              Cada bem cadastrado pertence a uma destas frentes de preservação.
            </p>
          </div>
        </div>
        <div className="categoria-chips">
          {Object.entries(CAT_LABEL).map(([valor, label]) => (
            <button
              key={valor}
              className={`categoria-chip cat-${valor}`}
              onClick={() => irParaAcervo(valor)}
            >
              <span className="chip-label">{label}</span>
              <span className="chip-count">{categorias[valor] ?? 0}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== CTA MAPA ===== */}
      <div className="map-cta">
        <div className="map-cta-inner">
          <div>
            <h2>Explore tudo no mapa interativo</h2>
            <p>
              Veja a localização de cada bem, filtre por categoria e navegue
              pelo acervo completo de Guarulhos.
            </p>
          </div>
          <button className="map-cta-btn" onClick={() => irParaAcervo()}>
            <MapIcon width={18} height={18} /> Abrir o acervo
          </button>
        </div>
      </div>

      {/* ===== DESTAQUES ===== */}
      <section className="destaques">
        <div className="section-head">
          <div>
            <h2>Destaques</h2>
            <p className="sub">
              Conheça alguns dos bens tombados e catalogados pela plataforma.
            </p>
          </div>
        </div>
        {carregando ? (
          <div className="skeleton-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="plaque-grid">
            {destaques.map((item) => (
              <PlaquetaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

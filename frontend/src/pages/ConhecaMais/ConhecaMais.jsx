import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  SparklesIcon,
  UsersIcon,
  MapIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";

export default function ConhecaMais() {
  const navigate = useNavigate();
  const { estatisticas, carregando } = usePatrimoniosContext();

  return (
    <div>
      <div className="page-hero">
        <h1>Conheça mais sobre o projeto</h1>
        <p>
          Um mapeamento colaborativo da memória histórica e cultural de
          Guarulhos, feito para aproximar a população da própria história.
        </p>
      </div>

      <section className="sobre" style={{ marginTop: 0 }}>
        <div className="sobre-inner">
          <div className="section-head">
            <div>
              <h2>Nossa missão</h2>
              <p className="sub">
                Três frentes guiam o que essa plataforma se propõe a fazer.
              </p>
            </div>
          </div>
          <div className="sobre-grid">
            <div className="sobre-card">
              <AcademicCapIcon width={24} height={24} />
              <h3>Educar</h3>
              <p>
                Aproximar estudantes e o público jovem da história e da memória
                artística de Guarulhos.
              </p>
            </div>
            <div className="sobre-card">
              <SparklesIcon width={24} height={24} />
              <h3>Preservar</h3>
              <p>
                Centralizar documentos, imagens e curiosidades sobre cada bem
                tombado num só lugar.
              </p>
            </div>
            <div className="sobre-card">
              <UsersIcon width={24} height={24} />
              <h3>Conectar</h3>
              <p>
                Incentivar o turismo cultural e aproximar moradores e visitantes
                da própria história.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="destaques">
        <div className="section-head">
          <div>
            <h2>Como usar a plataforma</h2>
            <p className="sub">
              Hoje o acervo reúne{" "}
              {carregando ? "vários" : (estatisticas?.totalBens ?? 0)} bens
              catalogados em{" "}
              {carregando ? "algumas" : (estatisticas?.totalCategorias ?? 0)}{" "}
              categorias diferentes.
            </p>
          </div>
        </div>
        <div className="sobre-grid">
          <div className="sobre-card">
            <Squares2X2Icon width={24} height={24} />
            <h3>Navegue pelo acervo</h3>
            <p>
              Filtre por categoria e leia o resumo histórico de cada patrimônio
              catalogado.
            </p>
            <button
              className="map-cta-btn"
              style={{
                marginTop: 12,
                color: "#fff",
                background: "var(--blue)",
              }}
              onClick={() => navigate("/patrimonios")}
            >
              Ver patrimônios
            </button>
          </div>
          <div className="sobre-card">
            <MapIcon width={24} height={24} />
            <h3>Explore no mapa</h3>
            <p>
              Veja onde cada bem está localizado na cidade e compare distâncias
              entre eles.
            </p>
            <button
              className="map-cta-btn"
              style={{
                marginTop: 12,
                color: "#fff",
                background: "var(--blue)",
              }}
              onClick={() => navigate("/mapa")}
            >
              Abrir o mapa
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

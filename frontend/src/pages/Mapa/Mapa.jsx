import { useState } from "react";
import FiltroBar from "../../features/mapa/FiltroBar";
import MapaPatrimonios from "../../features/mapa/MapaPatrimonios";
import ListaPatrimonios from "../../features/mapa/ListaPatrimonios";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";

export default function Mapa() {
  const [filtro, setFiltro] = useState("todos");
  const { patrimonios, carregando, selecionado, setSelecionado } =
    usePatrimoniosContext();

  const filtrados =
    filtro === "todos"
      ? patrimonios
      : patrimonios.filter((p) => p.categoria === filtro);

  const handleFiltro = (novo) => {
    setFiltro(novo);
    setSelecionado(null);
  };

  return (
    <div>
      <div className="page-hero">
        <h1>Mapa interativo</h1>
        <p>
          Veja no mapa onde cada patrimônio está localizado. Clique num pino ou
          na lista para ver o resumo.
        </p>
      </div>

      <div className="pg-mapa-shell">
        <FiltroBar ativo={filtro} onChange={handleFiltro} />

        {carregando ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="map-split">
            <MapaPatrimonios
              patrimonios={filtrados}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
            />
            <ListaPatrimonios
              patrimonios={filtrados}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
            />
          </div>
        )}
      </div>
    </div>
  );
}

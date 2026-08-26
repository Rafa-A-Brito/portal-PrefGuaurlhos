import { useState, useMemo } from "react";
import MapaPatrimonios from "../../features/mapa/components/MapaPatrimonios";
import FiltroBar from "../../features/mapa/components/FiltroBar";
import ListaPatrimonios from "../../features/mapa/components/ListaPatrimonios";
import PlaquetaCard from "../../features/mapa/components/PlaquetaCard";
import patrimoniosMock from "../../mocks/patrimoniosMock.json";

export default function Mapa() {
  const [filtro, setFiltro] = useState("todos");
  const [selecionado, setSelecionado] = useState(null);

  const patrimonios = useMemo(
    () =>
      filtro === "todos"
        ? patrimoniosMock
        : patrimoniosMock.filter((p) => p.categoria === filtro),
    [filtro],
  );

  const handleFiltro = (novo) => {
    setFiltro(novo);
    setSelecionado(null);
  };

  return (
    <div>
      <div className="page-hero">
        <h1>Mapa interativo de patrimônios</h1>
        <p>
          Explore os bens culturais, históricos e naturais cadastrados no
          município. Clique em um pino ou na lista para ver o resumo.
        </p>
      </div>

      <div className="pg-mapa-shell">
        <FiltroBar ativo={filtro} onChange={handleFiltro} />

        <div className="map-split">
          <MapaPatrimonios
            patrimonios={patrimonios}
            selecionado={selecionado}
            onSelecionar={setSelecionado}
          />
          <ListaPatrimonios
            patrimonios={patrimonios}
            selecionado={selecionado}
            onSelecionar={setSelecionado}
          />
        </div>

        <div className="section-head" style={{ marginTop: 48 }}>
          <div>
            <h2>Todos os bens filtrados</h2>
            <p className="sub">
              Lista completa em formato de plaqueta, sincronizada com o mapa
              acima.
            </p>
          </div>
        </div>
        <div className="plaque-grid">
          {patrimonios.map((item) => (
            <PlaquetaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

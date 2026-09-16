import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FiltroBar from "../../features/mapa/FiltroBar";
import PlaquetaCard from "../../features/mapa/PlaquetaCard";
import { filtrarPatrimonios } from "../../features/buscarPatrimonios";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";

export default function Patrimonios() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtro = searchParams.get("categoria") || "todos";
  const [busca, setBusca] = useState(searchParams.get("busca") || "");
  const { patrimonios, carregando, setSelecionado } = usePatrimoniosContext();

  useEffect(() => {
    return () => setSelecionado(null);
  }, [setSelecionado]);

  const filtrados = useMemo(
    () => filtrarPatrimonios(patrimonios, { categoria: filtro, busca }),
    [filtro, busca, patrimonios],
  );

  const handleFiltro = (novo) => {
    setSearchParams((params) => {
      if (novo === "todos") params.delete("categoria");
      else params.set("categoria", novo);
      return params;
    });
  };

  const handleBusca = (valor) => {
    setBusca(valor);
    setSearchParams((params) => {
      if (valor) params.set("busca", valor);
      else params.delete("busca");
      return params;
    });
  };

  return (
    <div>
      <div className="page-hero">
        <h1>Patrimônios catalogados</h1>
        <p>
          Explore o acervo completo de bens históricos, culturais e naturais de
          Guarulhos.
        </p>
        <div className="page-hero-hint">
          <MapIcon width={16} height={16} />
          <span>
            Prefere ver a localização de cada um? Use o item "Mapas" no menu.
          </span>
        </div>
      </div>

      <div className="pg-mapa-shell">
        <div className="mapa-search patrimonios-search">
          <MagnifyingGlassIcon width={16} height={16} />
          <input
            value={busca}
            onChange={(e) => handleBusca(e.target.value)}
            placeholder="Buscar por nome, bairro, endereço ou CEP..."
          />
        </div>

        <FiltroBar ativo={filtro} onChange={handleFiltro} />

        {carregando ? (
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : filtrados.length === 0 ? (
          <div className="empty-state">
            Nenhum patrimônio encontrado para esse filtro
            {busca ? ` e o termo "${busca}"` : ""}.
          </div>
        ) : (
          <>
            <div className="section-head">
              <div>
                <h2>
                  {filtrados.length}{" "}
                  {filtrados.length === 1
                    ? "bem encontrado"
                    : "bens encontrados"}
                </h2>
                <p className="sub">
                  Clique em um card para destacá-lo também no mapa.
                </p>
              </div>
            </div>
            <div className="plaque-grid">
              {filtrados.map((item, index) => (
                <div
                  key={item.id}
                  className="plaque-grid-item"
                  style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
                  onClick={() => setSelecionado(item)}
                >
                  <PlaquetaCard item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

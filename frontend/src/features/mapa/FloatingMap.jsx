import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapIcon,
  XMarkIcon,
  MinusIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import MapaPatrimonios from "./MapaPatrimonios";
import { usePatrimoniosContext } from "../../../context/PatrimoniosContext";

export default function FloatingMap() {
  const [aberto, setAberto] = useState(false);
  const [minimizado, setMinimizado] = useState(false);
  const { patrimonios, selecionado, setSelecionado, carregando } =
    usePatrimoniosContext();

  if (!aberto) {
    return (
      <button
        className="floating-map-fab"
        onClick={() => {
          setAberto(true);
          setMinimizado(false);
        }}
        aria-label="Abrir mapa interativo de patrimônios"
      >
        <MapIcon width={22} height={22} />
        <span>Mapa</span>
      </button>
    );
  }

  return (
    <div
      className={`floating-map-panel ${minimizado ? "is-minimized" : ""}`}
      role="dialog"
      aria-label="Mapa interativo de patrimônios"
    >
      <div className="floating-map-header">
        <div className="fmh-title">
          <MapIcon width={17} height={17} />
          <span>Mapa interativo</span>
        </div>
        <div className="fmh-actions">
          <Link
            to="/mapa"
            className="fmh-btn"
            title="Abrir acervo completo"
            onClick={() => setAberto(false)}
          >
            <ArrowTopRightOnSquareIcon width={15} height={15} />
          </Link>
          <button
            className="fmh-btn"
            onClick={() => setMinimizado((v) => !v)}
            title={minimizado ? "Expandir" : "Minimizar"}
          >
            <MinusIcon width={15} height={15} />
          </button>
          <button
            className="fmh-btn"
            onClick={() => setAberto(false)}
            title="Fechar"
          >
            <XMarkIcon width={15} height={15} />
          </button>
        </div>
      </div>

      {!minimizado && (
        <div className="floating-map-body">
          {carregando ? (
            <div className="floating-map-loading">Carregando patrimônios…</div>
          ) : (
            <MapaPatrimonios
              patrimonios={patrimonios}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
            />
          )}
        </div>
      )}
    </div>
  );
}

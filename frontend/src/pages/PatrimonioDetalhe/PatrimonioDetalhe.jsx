import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  MapPinIcon,
  MapIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";
import { CATEGORIA_META } from "../../features/categoriaMeta";
import PlaquetaCard from "../../features/mapa/PlaquetaCard";

export default function PatrimonioDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patrimonios, carregando, setSelecionado } = usePatrimoniosContext();

  const item = patrimonios.find((p) => String(p.id) === String(id));

  const verNoMapa = () => {
    if (item) setSelecionado(item);
    navigate("/mapa");
  };

  if (carregando) {
    return (
      <div className="detalhe-page">
        <div className="detalhe-hero detalhe-hero-skeleton" />
        <div className="detalhe-body">
          <div className="detalhe-content">
            <div className="skeleton-card" style={{ height: 220 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page-hero">
        <h1>Patrimônio não encontrado</h1>
        <p>Esse bem pode ter sido removido ou o link está incorreto.</p>
        <Link to="/patrimonios" className="detalhe-voltar-inline">
          <ArrowLeftIcon width={16} height={16} /> Voltar aos patrimônios
        </Link>
      </div>
    );
  }

  const meta = CATEGORIA_META[item.categoria];
  const Icon = meta?.Icon;
  const relacionados = patrimonios
    .filter((p) => p.categoria === item.categoria && p.id !== item.id)
    .slice(0, 3);
  const rotaUrl = item.localizacao
    ? `https://www.google.com/maps/dir/?api=1&destination=${item.localizacao.lat},${item.localizacao.lng}`
    : null;

  return (
    <div className="detalhe-page">
      <div
        className="detalhe-hero"
        style={{ backgroundImage: `url(${item.imagemPrincipal})` }}
      >
        <div className="detalhe-hero-overlay">
          <Link to="/patrimonios" className="detalhe-voltar">
            <ArrowLeftIcon width={16} height={16} /> Voltar aos patrimônios
          </Link>
          <div className="detalhe-hero-info">
            {meta && (
              <span className={`cat-badge cat-${item.categoria}`}>
                {Icon && <Icon className="badge-icon" aria-hidden="true" />}
                {meta.label}
              </span>
            )}
            <h1>{item.nome}</h1>
            <span className="detalhe-bairro">
              <MapPinIcon width={16} height={16} /> {item.bairro}
            </span>
          </div>
        </div>
      </div>

      <div className="detalhe-body">
        <div className="detalhe-content">
          <span className="num">Nº {String(item.id).padStart(3, "0")}</span>
          <p className="detalhe-resumo">{item.resumo}</p>

          {(item.endereco || item.cep) && (
            <div className="detalhe-endereco-card">
              <MapPinIcon width={18} height={18} />
              <div>
                <strong>{item.endereco || item.bairro}</strong>
                <span>
                  {item.bairro}, Guarulhos – SP
                  {item.cep ? ` · CEP ${item.cep}` : ""}
                </span>
              </div>
            </div>
          )}

          <div className="detalhe-actions">
            <button className="btn-solid" onClick={verNoMapa}>
              <MapIcon width={16} height={16} /> Ver no mapa
            </button>
            {rotaUrl && (
              <a
                className="btn-outline"
                href={rotaUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ArrowTopRightOnSquareIcon width={16} height={16} /> Traçar
                rota
              </a>
            )}
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="detalhe-relacionados">
            <h2>Outros patrimônios {meta?.label.toLowerCase()}</h2>
            <div className="plaque-grid">
              {relacionados.map((rel) => (
                <PlaquetaCard key={rel.id} item={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { CATEGORIA_META } from "../categoriaMeta";

const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23D9D9D9'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%235B5876' text-anchor='middle' dominant-baseline='middle'%3ESem imagem%3C/text%3E%3C/svg%3E";

export default function PlaquetaCard({ item }) {
  const meta = CATEGORIA_META[item.categoria];
  const Icon = meta?.Icon;

  return (
    <article className="plaqueta">
      <span className="rivet tl" />
      <span className="rivet tr" />
      <figure>
        <img
          src={item.imagemPrincipal}
          alt={item.nome}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
        <span className={`cat-badge cat-${item.categoria}`}>
          {Icon && <Icon className="badge-icon" aria-hidden="true" />}
          {meta?.label ?? item.categoria}
        </span>
      </figure>
      <div className="plaqueta-body">
        <span className="num">Nº {String(item.id).padStart(3, "0")}</span>
        <h3>{item.nome}</h3>
        <div className="bairro">
          <MapPinIcon className="inline-icon" aria-hidden="true" />
          {item.bairro}
        </div>
        <p className="resumo">{item.resumo}</p>
        <a className="verlink" href="#">
          Ver detalhes{" "}
          <ArrowRightIcon className="inline-icon-sm" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

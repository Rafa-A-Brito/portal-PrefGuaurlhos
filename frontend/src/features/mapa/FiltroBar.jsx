const CATEGORIAS = [
  { valor: "todos", label: "Todos" },
  { valor: "arquitetonico", label: "Arquitetônico" },
  { valor: "imaterial", label: "Imaterial" },
  { valor: "natural", label: "Natural" },
  { valor: "documental", label: "Documental" },
];

export default function FiltroBar({ ativo, onChange }) {
  return (
    <div className="filterbar">
      <span className="label">Filtrar por:</span>
      {CATEGORIAS.map((cat) => (
        <button
          key={cat.valor}
          className={`filter-pill ${ativo === cat.valor ? "on" : ""}`}
          onClick={() => onChange(cat.valor)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

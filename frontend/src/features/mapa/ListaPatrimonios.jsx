const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='100%25' height='100%25' fill='%23D9D9D9'/%3E%3C/svg%3E";

export default function ListaPatrimonios({
  patrimonios,
  selecionado,
  onSelecionar,
}) {
  return (
    <div className="list-panel">
      <div className="list-panel-head">
        <h3>Resultados</h3>
        <span className="count">
          {patrimonios.length}{" "}
          {patrimonios.length === 1 ? "bem encontrado" : "bens encontrados"}
        </span>
      </div>
      <div className="list-scroll">
        {patrimonios.map((item) => (
          <div
            key={item.id}
            className={`list-item ${selecionado?.id === item.id ? "active" : ""}`}
            onClick={() =>
              onSelecionar(selecionado?.id === item.id ? null : item)
            }
          >
            <img
              className="thumb"
              src={item.imagemPrincipal}
              alt={item.nome}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
            <div>
              <span className="num">Nº {String(item.id).padStart(3, "0")}</span>
              <h4>{item.nome}</h4>
              <div className="meta">📍 {item.bairro}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

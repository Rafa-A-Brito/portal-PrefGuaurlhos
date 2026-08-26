import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-mark">⌂</div>
        <div className="brand-text">
          <span className="b1">Prefeitura de Guarulhos</span>
          <span className="b2">Patrimônio Cultural</span>
        </div>
      </div>
      <nav className="navbar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Início
        </NavLink>
        <NavLink
          to="/mapa"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Mapa
        </NavLink>
      </nav>
    </header>
  );
}

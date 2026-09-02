import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import BrasaoGuarulhos from "../../../../components/Brasao/BrasaoGuarulhos";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <BrasaoGuarulhos size={36} className="brand-mark" />
        <div className="brand-text">
          <span className="b1">Prefeitura de Guarulhos</span>
          <span className="b2">Patrimônio Cultural</span>
        </div>
      </div>

      <nav className="navbar-nav navbar-nav-desktop">
        <NavLink to="/" end className={linkClass}>
          Início
        </NavLink>
        <NavLink to="/mapa" className={linkClass}>
          Acervo &amp; Mapa
        </NavLink>
      </nav>

      <button
        className="navbar-toggle"
        onClick={() => setMenuAberto((v) => !v)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        {menuAberto ? (
          <XMarkIcon width={22} height={22} />
        ) : (
          <Bars3Icon width={22} height={22} />
        )}
      </button>

      {menuAberto && (
        <nav className="navbar-nav navbar-nav-mobile">
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setMenuAberto(false)}
          >
            Início
          </NavLink>
          <NavLink
            to="/mapa"
            className={linkClass}
            onClick={() => setMenuAberto(false)}
          >
            Acervo &amp; Mapa
          </NavLink>
        </nav>
      )}
    </header>
  );
}
